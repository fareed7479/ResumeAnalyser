import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getReports, getDashboardStats } from '../api/resumeAPI';

// Initial state
const initialState = {
  reports: [],
  currentReport: null,
  dashboardStats: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalReports: 0,
    hasNext: false,
    hasPrev: false,
  },
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_REPORTS: 'SET_REPORTS',
  SET_CURRENT_REPORT: 'SET_CURRENT_REPORT',
  CLEAR_CURRENT_REPORT: 'CLEAR_CURRENT_REPORT',
  SET_DASHBOARD_STATS: 'SET_DASHBOARD_STATS',
  ADD_REPORT: 'ADD_REPORT',
  UPDATE_REPORT: 'UPDATE_REPORT',
  DELETE_REPORT: 'DELETE_REPORT',
  SET_PAGINATION: 'SET_PAGINATION',
};

// Reducer
const reportReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ActionTypes.SET_REPORTS:
      return {
        ...state,
        loading: false,
        reports: action.payload.reports,
        pagination: action.payload.pagination,
        error: null,
      };

    case ActionTypes.SET_CURRENT_REPORT:
      return {
        ...state,
        loading: false,
        currentReport: action.payload,
        error: null,
      };

    case ActionTypes.CLEAR_CURRENT_REPORT:
      return {
        ...state,
        currentReport: null,
      };

    case ActionTypes.SET_DASHBOARD_STATS:
      return {
        ...state,
        dashboardStats: action.payload,
        loading: false,
        error: null,
      };

    case ActionTypes.ADD_REPORT:
      return {
        ...state,
        reports: [action.payload, ...state.reports],
        pagination: {
          ...state.pagination,
          totalReports: state.pagination.totalReports + 1,
        },
      };

    case ActionTypes.UPDATE_REPORT:
      return {
        ...state,
        reports: state.reports.map(report =>
          report._id === action.payload._id ? action.payload : report
        ),
        currentReport: state.currentReport?._id === action.payload._id 
          ? action.payload 
          : state.currentReport,
      };

    case ActionTypes.DELETE_REPORT:
      return {
        ...state,
        reports: state.reports.filter(report => report._id !== action.payload),
        pagination: {
          ...state.pagination,
          totalReports: Math.max(0, state.pagination.totalReports - 1),
        },
        currentReport: state.currentReport?._id === action.payload 
          ? null 
          : state.currentReport,
      };

    case ActionTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };

    default:
      return state;
  }
};

// Context
const ReportContext = createContext();

// Provider component
export const ReportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportReducer, initialState);

  // Load reports with pagination
  const loadReports = async (page = 1, limit = 10) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    
    try {
      const result = await getReports(page, limit);
      
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_REPORTS,
          payload: {
            reports: result.data,
            pagination: result.pagination,
          },
        });
      } else {
        dispatch({ type: ActionTypes.SET_ERROR, payload: result.error });
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to load reports' });
    }
  };

  // Load dashboard statistics
  const loadDashboardStats = async () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    
    try {
      const result = await getDashboardStats();
      
      if (result.success) {
        dispatch({
          type: ActionTypes.SET_DASHBOARD_STATS,
          payload: result.data,
        });
      } else {
        dispatch({ type: ActionTypes.SET_ERROR, payload: result.error });
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to load dashboard statistics' });
    }
  };

  // Add new report (after successful analysis)
  const addReport = (report) => {
    dispatch({ type: ActionTypes.ADD_REPORT, payload: report });
  };

  // Update existing report
  const updateReport = (report) => {
    dispatch({ type: ActionTypes.UPDATE_REPORT, payload: report });
  };

  // Delete report
  const deleteReport = async (reportId) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    
    try {
      const { deleteReport: deleteReportAPI } = await import('../api/resumeAPI');
      const result = await deleteReportAPI(reportId);
      
      if (result.success) {
        dispatch({ type: ActionTypes.DELETE_REPORT, payload: reportId });
      } else {
        dispatch({ type: ActionTypes.SET_ERROR, payload: result.error });
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Failed to delete report' });
    }
  };

  // Set current report
  const setCurrentReport = (report) => {
    dispatch({ type: ActionTypes.SET_CURRENT_REPORT, payload: report });
  };

  // Clear current report
  const clearCurrentReport = () => {
    dispatch({ type: ActionTypes.CLEAR_CURRENT_REPORT });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Load initial data
  useEffect(() => {
    loadDashboardStats();
  }, []);

  const contextValue = {
    ...state,
    loadReports,
    loadDashboardStats,
    addReport,
    updateReport,
    deleteReport,
    setCurrentReport,
    clearCurrentReport,
    clearError,
  };

  return (
    <ReportContext.Provider value={contextValue}>
      {children}
    </ReportContext.Provider>
  );
};

// Custom hook to use the context
export const useReports = () => {
  const context = useContext(ReportContext);
  
  if (!context) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  
  return context;
};

export default ReportContext;
