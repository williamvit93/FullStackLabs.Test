import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    url: 'http://localhost:3002',
    online: false,
    name: null
  };

  const nodeB = {
    url: 'http://localhost:3003',
    online: false,
    name: null
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: { node_name: 'alpha' } };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_BY_NODE_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCKS_BY_NODE_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: true
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_BY_NODE_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = {
      type: ActionTypes.GET_BLOCKS_BY_NODE_SUCCESS, node: nodeA, res: {
        data: [
          {
            "id": "5",
            "type": "blocks",
            "attributes": {
              "index": 1,
              "timestamp": 1530679678,
              "data": "The Human Torch",
              "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
              "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
            }
          },
          {
            "id": "6",
            "type": "blocks",
            "attributes": {
              "index": 2,
              "timestamp": 1530679684,
              "data": "is denied",
              "previous-hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
              "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
            }
          }]
      }
    };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            list: [
              {
                "id": "5",
                "type": "blocks",
                "attributes": {
                  "index": 1,
                  "timestamp": 1530679678,
                  "data": "The Human Torch",
                  "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                  "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
                }
              },
              {
                "id": "6",
                "type": "blocks",
                "attributes": {
                  "index": 2,
                  "timestamp": 1530679684,
                  "data": "is denied",
                  "previous-hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
                  "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
                }
              }],
              loading: false
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_BY_NODE_FAILURE', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCKS_BY_NODE_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            error: "connection refused",
            loading: false
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
