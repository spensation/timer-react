import fetch from 'isomorphic-fetch'
import { requestOptions } from '../utils/session';

export function fetchRoutines() {
  return(dispatch) => {
    dispatch({ type: 'LOADING_ROUTINES' });

    return fetch('/api/v1/routines', requestOptions())
      .then(response => response.json())
      .then(routines => dispatch({
        type: 'FETCH_ROUTINES',
        payload: routines.routines,
      }));

  };
}

export function loadCurrentRoutine(id) {
  return(dispatch) => {
    dispatch({ type: 'LOADING_CURRENT_ROUTINE' });

    return fetch(`/api/v1/routines/${id}`, requestOptions())
      .then(response => response.json())
      .then(routine => dispatch({
        type: 'FETCH_CURRENT_ROUTINE',
        payload: routine.routine,
      }));
  }
}

export function clearCurrentRoutine() {
  return { type: 'CLEAR_CURRENT_ROUTINE' }
}

export function advanceCurrentRoutine(playlist, timerId) {
  return { type: 'ADVANCE_TIMER' }
}

export function rewindCurrentRoutine() {
  return { type: 'REWIND_TIMER' }
}

export function startCurrentRoutine() {
  return(dispatch) => {
    const timerId = setInterval(() => dispatch(advanceCurrentRoutine()), 1000);

    dispatch({ type: 'START_TIMER', payload: timerId });
    dispatch({ type: 'ADVANCE_TIMER' });
  }
}

export function fetchRoutine(id) {
  return(dispatch) => {
    dispatch({ type: 'LOADING_ROUTINE' });

    return fetch(`/api/v1/routines/${id}`, requestOptions())
      .then(response => response.json())
      .then(routine => dispatch({
        type: 'FETCH_ROUTINE',
        payload: routine.routine,
      }));
  }
}
