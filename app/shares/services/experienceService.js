import { httpRequest } from '../../utils/httpClient';

export const experienceService = {
  createExperience,
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

function createExperience(params) {
  const uri = `experiences`;
  const formData = new FormData();
  formData.append('user_id', params.user_id);
  formData.append('title', params.title);
  formData.append('company', params.companyName);
  formData.append('start_date', params.startDate);
  formData.append('end_date', params.endDate);
  formData.append('description', params.description);
  formData.append('company_logo', params.selectedFile);

  return new Promise((resolve, reject) =>
    httpRequest
      .default()
      .post(uri, formData, {
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
