import http from "../http-common";

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/tutorials/${id}`);
};

const TutorialService = {
  update,
  remove,
};

export default TutorialService;
