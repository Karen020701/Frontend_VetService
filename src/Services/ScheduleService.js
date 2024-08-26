import { gql, request } from 'graphql-request';

const endpoint = 'http://localhost:3017/graphql';


const GET_SCHEDULES = gql`
  query {
    schedules {
      id
      day
      start_time
      end_time
    }
  }
`;


const ADD_SCHEDULE = gql`
  mutation($day: String!, $start_time: String!, $end_time: String!) {
    addSchedule(day: $day, start_time: $start_time, end_time: $end_time) {
      id
      day
      start_time
      end_time
    }
  }
`;

const DELETE_SCHEDULE = gql`
  mutation($id: Int!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`;

const UPDATE_SCHEDULE = gql`
  mutation($id: Int!, $day: String, $start_time: String, $end_time: String) {
    updateSchedule(id: $id, day: $day, start_time: $start_time, end_time: $end_time) {
      id
      day
      start_time
      end_time
    }
  }
`;

export const fetchSchedules = async () => {
  try {
    const data = await request(endpoint, GET_SCHEDULES);
    return data.schedules;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
};

export const createSchedule = async (schedule) => {
  try {
    const data = await request(endpoint, ADD_SCHEDULE, schedule);
    return data.addSchedule;
  } catch (error) {
    console.error('Error creating schedule:', error);
    return null;
  }
};

export const deleteSchedule = async (id) => {
  try {
    const data = await request(endpoint, DELETE_SCHEDULE, { id });
    return data.deleteSchedule;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return null;
  }
};

export const updateSchedule = async (id, schedule) => {
  try {
    const data = await request(endpoint, UPDATE_SCHEDULE, { id, ...schedule });
    return data.updateSchedule;
  } catch (error) {
    console.error('Error updating schedule:', error);
    return null;
  }
};
