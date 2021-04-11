import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if(res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
    });
  };
}

const getBlocksByNodeStart = (node) => {
  return {
    type: types.GET_BLOCKS_BY_NODE_START,
    node
  };
};

const getBlocksByNodeSuccess = (node, res) => {
  return {
    type: types.GET_BLOCKS_BY_NODE_SUCCESS,
    node,
    res
  };
};

const getBlocksByNodeFailure = node => {
  return {
    type: types.GET_BLOCKS_BY_NODE_FAILURE,
    node,
  };
};

export function getBlocksByNode(node) {
  return async (dispatch) => {
    try {
      dispatch(getBlocksByNodeStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if(res.status >= 400) {
        dispatch(getBlocksByNodeFailure(node));
      }

      const json = await res.json();

      dispatch(getBlocksByNodeSuccess(node, json));
    } catch (err) {
      dispatch(getBlocksByNodeFailure(node));
    }
  };
}
