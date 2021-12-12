import { httpRequest } from '../../utils/httpClient';

export const experienceService = {
  updateExperience,
};

function updateExperience(id, params) {
  const uri = `experiences/${id}`;
  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .patch(uri, params)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      }),
  );
}
