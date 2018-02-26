/* ------------------- NOTES -------------------- *//*

*//* ---------------------------------------------- */

import { ActionType } from 'src/constants.js';
import { audioFiles } from 'src/audio/audio-files.js';

const initialState = {
  targets: audioFiles.reduce(
    (aggr, file, index) => ({
      ...aggr, [file.filename]: {
          title: file.title,
          filename: file.filename,
          position: { azimuth: index * Math.PI/6, distance: 30},
          volume: 0
      }
    }),
    {}
  ),
  selected: [],
}

export default function(state = initialState, {type, payload}) {
  if (type === ActionType.SET_TARGET) {
    const newSelected = state.selected.map(x => x);
    const index = newSelected.indexOf(payload.target);
    if (index  >= 0) {
      newSelected.splice(index,1);
    } else {
      newSelected.push(payload.target);
    };
    // console.log("Action: SET TARGET");
    // console.log(`Payload: ${payload}`);
    // console.log("NEW STATE");
    // console.log({ ...state, selected: newSelected });
    return { ...state, selected: newSelected };
  }
  if (type === ActionType.SET_TARGET_POSITION) {
    const newTargets = Object.assign({},state.targets);
    Object.assign(newTargets[payload.target].position, payload.position);
    // console.log("Action: SET TARGET POSITION");
    // console.log(`Payload: ${payload}`);
    // console.log("NEW STATE");
    // console.log({ ...state, targets: newTargets });
    return { ...state, targets: newTargets };
  }
  if (type === ActionType.SET_TARGET_VOLUME) {
    const newTargets = Object.assign({},state.targets);
    Object.assign(newTargets[payload.target].volume, payload.volume);
    // console.log("Action: SET TARGET VOLUME");
    // console.log(`Payload: ${payload}`);
    // console.log("NEW STATE");
    // console.log({ ...state, targets: newTargets });
    return { ...state, targets: newTargets };
  }

  return state;
}
