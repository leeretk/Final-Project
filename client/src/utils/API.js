import axios from "axios";

export default {

  getMovements: function () {
    return axios.get("/api/movements");
  },
  getGymUsers: function (gym) {
    return axios.get("/api/programs/"+gym);
  },
  getWOD: function (workoutData) {
    console.log(workoutData)
    return axios.get("/api/workouts/"+workoutData.createdBy,workoutData)

  },
  getWorkouts: function (id) {
    return axios.get("/api/workouts/" + id);
  },

  deleteWorkouts: function (id) {
    return axios.delete("/api/workouts/" + id);
  },

  saveWorkoutsByUser: function (workoutData) {

    return axios.post("/api/workouts/" + workoutData.scores.userName, workoutData);
  },
  getUsers: function () {
    return axios.get("/api/users")
  },
  getUser: function (userName) {
    return axios.get("/api/users/" + userName);
  },
  checkPassword: function (userData) {
    return axios.get("/api/users/" + userData.userName + "/" + userData.password);
  },
  createUser: function (userData) {
    return axios.post("/api/users", userData)
  },
  getPrograms() {
    return axios.get("api/programs")
  }
};