import { httpRequest } from '../../utils/httpClient';

export const experienceService = {
  updateExperience,
  updateExperienceCompanyLogo,
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

function updateExperienceCompanyLogo(id, rawImage) {
  const uri = `experiences/${id}`;
  const formData = new FormData();
  formData.set('company_logo', rawImage);

  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .patch(uri, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      }),
  );
}
