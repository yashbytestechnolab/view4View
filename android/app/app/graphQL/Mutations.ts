import { gql } from "@apollo/client";

export const SIGNIN_BY_EMAIL = gql`mutation SignInByEmail($input: SiginIn!) {
  signInByEmail(input: $input) {
    status
    message
    email
    user {
      _id
      email
      firstname
      lastname
      gender
      phoneno
      userType
      dob
      isActive
      termsAndConditationStatus
      profilepicture
      password
      createdBy
      createdAt
      updatedAt
      isSocial
      googleRefID
      facebookRefID
      appleRefID
      deviceType
      trackerType
      trackerId
      savedMerchant {
        _id
        firstname
        lastname
        dob
        securityNo
        apartmentNo
        address
        city
        state_id {
          _id
          name
          value
        }
        country_id {
          _id
          name
        }
        zipcode
        phonNo
        personalPhoneNo
        startupDate
        ownership
        accountNo
        routingNo
        ownershipType
        stateSaleTax
        fedralTax
        productSold
        merchantCategoryClassification
        monthInBusiness
        yearInBusiness
        createdAt
        business_data {
          merchantID
          isActive
          businessName
          address
          businessDescription
          apartmentNo
          city
          zipcode
          website
          email
          socialUrl
          phoneno
          businessLogo
          bannerImages
          businessStatus
          latitude
          longitude
          logoUrl
          totalDeal
        }
        email
        termsAndConditationStatus
        isActive
        isVoid
        userType
      }
    }
    jwttoken
    errorCode
  }
}`

export const SIGNUP_BY_EMAIL = gql`
mutation signUpByEmail($input: SignUp!) {
  signUpByEmail(input: $input) {
    status
    message
    email
    user {
      _id
      email
      firstname
      lastname
      gender
      phoneno
      userType
      dob
      isActive
      termsAndConditationStatus
      profilepicture
      password
      createdBy
      createdAt
      updatedAt
      defaultAddress {
        _id
        user_id
        addressLine1
        addressLine2
        city
        state_id {
          _id
          name
          value
        }
        country_id {
          _id
          name
        }
        zipcode
        addressType
      }
      isSocial
      googleRefID
      facebookRefID
      appleRefID
      deviceType
      trackerType
    }
    jwttoken
    errorCode
  }
}`

export const SETNEWPASSWORD = gql`
  mutation changeUserPassword($input: changePassword!) {
    changeUserPassword(input: $input) {
      status
      message
      errorCode
    }
  }
  `

export const FORGOT_USER_PASSWORD = gql`mutation forgotUserPassword($input:forgotUserNewPassword!) {
  forgotUserPassword(input: $input) {
    status
    message
    errorCode
  }
}`

export const SET_NEW_USER_PASSWORD = gql`mutation setNewUserPassword($setUserNewPassword : setUserNewPassword!){
  setNewUserPassword(input: $setUserNewPassword) {
    status
    message
    errorCode
  }
}`

export const UPDATE_TRACKER_TYPE = gql`mutation UpdateTrackerType($input: updateTrackerType) {
  updateTrackerType(input: $input) {
    status
    message
    email
    user {
      _id
      email
      firstname
      lastname
      gender
      phoneno
      userType
      dob
      isActive
      termsAndConditationStatus
      profilepicture
      password
      createdBy
      createdAt
      updatedAt
      defaultAddress {
        _id
        user_id
        addressLine1
        addressLine2
        city
        zipcode
        addressType
      }
      isSocial
      googleRefID
      facebookRefID
      appleRefID
      deviceType
      trackerType
      trackerId
      lastSyncSteps
      lastSyncSleep
    }
    jwttoken
    errorCode
  }
}`

export const SET_USER_STEPS = gql`mutation SetUserSteps($input: setUserSteps!) {
  setUserSteps(input: $input) {
    status
    message
    data {
      user_id
      steps {
        value
        date
      }
      trackerType
      trackerId
    }
    errorCode
  }
}`

export const SET_USER_SLEEP = gql`mutation SetUserSleep($input: setUserSleep!) {
  setUserSleep(input: $input) {
    status
    message
    data {
      user_id
      sleep {
        startDate
        endDate
      }
      trackerType
      trackerId
    }
    errorCode
  }
}`

export const EDIT_USER_PROFILE = gql`mutation EditUser($input: editUser!) {
  editUser(input: $input) {
    status
    message
    email
    user {
       _id
      email
      firstname
      lastname
      gender
      phoneno
      userType
      dob
      isActive
      termsAndConditationStatus
      profilepicture
      password
      createdBy
      createdAt
      updatedAt
      isSocial
      googleRefID
      facebookRefID
      appleRefID
      deviceType
      trackerType
      trackerId
      lastSyncSteps
      lastSyncSleep
      defaultAddress {
        addressLine1
        addressLine2
      }
    }
    jwttoken
    errorCode
  }
}
`

export const CHAGE_USER_PASSWORD = gql`mutation ChangeUserPassword($input: changePassword!) {
  changeUserPassword(input: $input) {
    status
    message
    errorCode
  }
}
`

export const UNLINK_TRACKER = gql`
mutation UnlinkTracker {
  unlinkTracker {
    status
    message
    errorCode
  }
}`

export const ADD_ADDRESS = gql`
mutation AddAddress($input: addAddress!) {
  addAddress(input: $input) {
    status
    message
    data {
      _id
      user_id
      addressLine1
      addressLine2
      city
      state_id {
        _id
        name
        value
      }
      country_id {
        _id
        name
      }
      zipcode
      addressType
    }
    errorCode
  }
}`

export const UPDATE_ADDRESS = gql`
mutation UpdateAddressByUser($input: updateAddressByUser!) {
  updateAddressByUser(input: $input) {
    status
    message
    data {
      _id
      user_id
      addressLine1
      addressLine2
      city
      state_id {
        _id
        name
        value
      }
      country_id {
        _id
        name
      }
      zipcode
      addressType
    }
    errorCode
  }
}`

export const REMOVE_ADDRESS = gql`mutation removeAddressByUser($input: ID!) {
  removeAddressByUser(id: $input) {  
    status
    message
    errorCode
  }
}`

export const ADD_TO_CART = gql`
mutation UserAddToCart($input: userAddToCartInput!) {
  userAddToCart(input: $input) {
    status
    message
    data {
      variantId {
        _id
        product_id {
          _id
          account_id
          sku
          title
          description
          manufacturer
          primaryCat
          secondaryCat
          tertiaryCat
          images
          options
        }
        sku
        title
        msrp
        weight
        length
        width
        height
        cost
        quantity
        images
        price
        estimatedShippingCost
        weightUnit
        featured
        sort
        category {
          _id
          primaryCat
          secondaryCat
          tertiaryCat
          discount
          catImage
        }
        options {
          _id
          product_id
          variant_id
          name
          value
        }
      }
      _id
      quantity
      productId {
        _id
        account_id
        sku
        title
        description
        manufacturer
        primaryCat
        secondaryCat
        tertiaryCat
        images
        options
      }
      categoryId {
        _id
        primaryCat
        secondaryCat
        tertiaryCat
        discount
        catImage
      }
    }
    errorCode
  }
}
`
export const UPDATE_CART = gql`
mutation UserUpdateCart($input: userUpdateCartInput!) {
  userUpdateCart(input: $input) {
    status
    message
    data {
      variantId {
        _id
        product_id {
          _id
          account_id
          sku
          title
          description
          manufacturer
          primaryCat
          secondaryCat
          tertiaryCat
          images
          options
        }
        sku
        title
        msrp
        weight
        length
        width
        height
        cost
        quantity
        images
        price
        estimatedShippingCost
        weightUnit
        featured
        sort
        category {
          _id
          primaryCat
          secondaryCat
          tertiaryCat
          discount
          catImage
        }
        options {
          _id
          product_id
          variant_id
          name
          value
        }
      }
      _id
      quantity
      productId {
        _id
        account_id
        sku
        title
        description
        manufacturer
        primaryCat
        secondaryCat
        tertiaryCat
        images
        options
      }
      categoryId {
        _id
        primaryCat
        secondaryCat
        tertiaryCat
        discount
        catImage
      }
    }
    errorCode
  }
}
`