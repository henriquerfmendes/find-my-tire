export const API_CONFIG = {
  companyId: 3,
  branchOfficeId: 215,
  pageSize: 100,
  defaultTimeout: 30000
};

export const UI_CONFIG = {
  pageSize: 20,
  debounceTime: 300,
  maxItemsInList: 100
};

export const getBaseApiParams = (): URLSearchParams => {
  const params = new URLSearchParams();
  params.append('companyId', API_CONFIG.companyId.toString());
  params.append('branchOfficesId', API_CONFIG.branchOfficeId.toString());
  return params;
};