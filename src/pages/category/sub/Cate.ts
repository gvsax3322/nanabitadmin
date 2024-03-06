export interface deleteCateForm {
  imain: number;
  successFn: void;
  failFn: void;
  errorFn: void;
}

export interface mainCateData {
  imain: number;
  mainCategory: string;
  middleCategoryList: [];
}

export interface middleCategoryList {
  imiddle: number;
  middleCategory: string;
  candidateKey: number;
}
