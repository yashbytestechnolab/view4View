export const config: any = {
  webClientId: '39912871250-tpj7ugjvnqs7qlc3hb9a1f6ev13e1boh.apps.googleusercontent.com',
  // baseUrl: 'https://api.centavizer.cilalabs.dev/graphql',
  baseUrl: 'https://api-stage.centavizer.cilalabs.dev/graphql',
  googleMapKey: '',
  imageStorageUrl: 'https://storage.googleapis.com/centavizer-pre-prod/userprofile/',
  preProdImgUrl: 'https://storage.googleapis.com/centavizer-pre-prod/'
};

const REACT_APP_GOOGLE_STORAGE_BASE_PATH: any = 'https://storage.cloud.google.com/centavizer-pre-prod/'

export const baseFilePaths = {
  dealImage: `${process.env.REACT_APP_GOOGLE_STORAGE_BASE_PATH}dealimages/`,
  businessProfile: `${REACT_APP_GOOGLE_STORAGE_BASE_PATH}businessprofile/`,
  businessBanner: `${REACT_APP_GOOGLE_STORAGE_BASE_PATH}businessbanner/`,
  userProfileImage: `${REACT_APP_GOOGLE_STORAGE_BASE_PATH}userprofile/`
};