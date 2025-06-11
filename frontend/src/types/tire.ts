export interface Tire {
  id: number;
  serialNumber: string;
  additionalId?: string;
  companyGroupId: number;
  companyGroupName: string;
  branchOfficeId: number;
  branchOfficeName: string;
  currentLifeCycle: number;
  timesRetreaded: number;
  maxRetreadsExpected: number;
  recommendedPressure: number;
  currentPressure?: number;
  middleInnerTreadDepth?: number;
  outerTreadDepth?: number;
  middleOuterTreadDepth?: number;
  innerTreadDepth?: number;
  dot?: string;
  purchaseCost: number;
  newTire: boolean;
  status: string;
  createdAt?: string;
  tireSize: TireSize;
  make: Make;
  model: Model;
  currentRetread?: CurrentRetread;
  installed?: Installed;
  disposal?: Disposal;
  analysis?: Analysis;
  registrationImages?: RegistrationImage[];
}

export interface TireSize {
  id: number;
  height: number;
  width: number;
  rim: number;
}

export interface Make {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
  additionalId?: string;
  groovesQuantity: number;
  treadDepth: number;
}

export interface CurrentRetread {
  make: Make;
  model: Model;
  retreadCost: number;
}

export interface Analysis {
  recapperId: number;
  recapperName: string;
  recapperPickUpId?: string;
  reason?: string;
}

export interface Disposal {
  disposalReasonId: number;
  disposalReasonDescription: string;
  disposalImagesUrl: string[];
}

export interface Installed {
  vehicleId: number;
  licensePlate: string;
  fleetId?: string;
  installedPosition: number;
  installedPositionName: string;
}

export interface RegistrationImage {
  id: number;
  url: string;
}

export interface TireListResponse {
  content: Tire[];
  pageSize: number;
  pageNumber: number;
  numberOfElements: number;
  totalElements?: number;
  totalPages?: number;
  empty?: boolean;
  lastPage?: boolean;
}

export interface TireFilters {
  make?: string;
  model?: string;
  status?: string;
  [key: string]: string | number | undefined;
}

export interface TireListParams {
  companyId: number;
  branchOfficesId: number;
  pageSize?: number;
  page?: number;
  brand?: string;
  model?: string;
  size?: string;
  filters?: TireFilters;
}
