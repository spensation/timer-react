import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import TextAreaField from '../components/TextAreaField';
import SelectField from '../components/SelectField';

import * as actions from '../actions/routineFormActions';
import { displayTime } from './../utils/displayTime';

export class RoutineForm extends Component {
  render() {
    const { actions } = this.props;

    return (
      <form>
        <h1>Routine Form</h1>
        <div>
          <TextField
            label="Name"
            name="routine.name"
            value={this.props.routine.name}
            onChange={(ev) => actions.changeRoutine("name", ev.target.value)} />
          <TextAreaField
            label="Description"
            name="routine.description"
            value={this.props.routine.description}
            onChange={(ev) => actions.changeRoutine("description", ev.target.value)} />
          <TextField
            label="Link"
            name="routine.link"
            value={this.props.routine.link}
            onChange={(ev) => actions.changeRoutine("link", ev.target.value)} />
          <SelectField
            label="Public"
            name="routine.public"
            value={this.props.routine.public}
            onChange={(ev) =>
              actions.changeRoutine("public", (ev.target.value === "true"))} >
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </SelectField>
        </div>
        <div>
          { this.props.routine.groups.map((group, groupIndex) => {
            return (
              <ul key={groupIndex}>
                <li>
                  <NumberField
                    label="Times"
                    name={`routine.group[${groupIndex}]`}
                    value={group.times}
                    onChange={(ev) =>
                      actions.changeGroup(
                        group.id, "times", parseInt(ev.target.value))} />
                  <button onClick={(ev) => actions.removeGroup(ev, group.id)}>
                    Remove Group
                  </button>
                  <button>Move Up</button>
                  <button>Move Down</button>
                </li>
                  { group.intervals.map((interval, intervalIndex) => {
                      return (
                        <ul key={intervalIndex} className={interval.id}>
                          <li>
                            <TextField
                              label="Name"
                              name={
                                `routine.group[${groupIndex}].interval[${intervalIndex}].name`
                              }
                              value={interval.name}
                              onChange={(ev) =>
                                actions.changeInterval(
                                  group.id, interval.id, "name", ev.target.value)} />
                          </li>
                          <li>
                            <NumberField
                              label="Duration"
                              name={
                                `routine.group[${groupIndex}].interval[${intervalIndex}].duration`
                              }
                              value={interval.duration}
                              onChange={(ev) =>
                                actions.changeInterval(
                                  group.id, interval.id, "duration", parseInt(ev.target.value))} />
                          </li>
                          <li>
                            <button
                              onClick={(ev) =>
                                  actions.removeInterval(ev, group.id, interval.id)}>
                              Remove Interval
                            </button>
                            <button>Move Up</button>
                            <button>Move Down</button>
                          </li>
                        </ul>
                      )
                    })
                  }
                  <li>
                    <button onClick={(ev) => actions.addInterval(ev, group.id)}>
                      Add Interval
                    </button>
                  </li>
              </ul>
              );
            })
          }
          <button onClick={(ev) => actions.addGroup(ev)}>
            Add Group
          </button>
        </div>
        <input
          type="submit"
          value="Save" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    routine: state.currentRoutine.routine,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}


export default connect(mapStateToProps, mapDispatchToProps)(RoutineForm);