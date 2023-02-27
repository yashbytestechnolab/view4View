import { gql } from "@apollo/client";

export const get_Merchant_ListByUser = gql`
query GetMerchantListByUser($getMerchantListByUserId: ID) {
  getMerchantListByUser(id: $getMerchantListByUserId) {
    status
    message
    businessData {
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
    deals {
      _id
      isActive
      dealImages
      name
      decription
      price
      discountType
      discountValue
      startDate
      endDate
      merchant_id {
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
    errorCode
  }
}
`
export const Get_Deal_by_user = gql`
query GetDealsByUser($limit: Int) {
  getDealsByUser(limit: $limit) {
    status
    message
    data {
      _id
      isActive
      merchant_id {
        _id
        firstname
        lastname
        dob
        securityNo
        apartmentNo
        address
        city
        
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
          category_id {
            _id
            name
            catImage
          }
         
          socialUrl
          phoneno
          businessLogo
          bannerImages
         
          businessStatus
          latitude
          longitude
          logoUrl
          totalDeal
          country_id {
            _id
            name
          }
          state_id {
            _id
            name
            value
          }
          subCategory_id {
            _id
            name
            refId {
              _id
              catImage
              name
            }
          }
          timings {
            status
            openingTime
            closingTime
            isOpenDay
          }
        }
        email
        termsAndConditationStatus
        isActive
        isVoid
        userType
        state_id {
          _id
          name
          value
        }
        country_id {
          _id
          name
        }
      }
      dealImages
      name
      decription
      price
      discountType
      discountValue
      startDate
      endDate
      featured
    }
    total
    limit
    offset
    errorCode
  }
}

`
export const Get_state = gql`
query state{
  state {
    status
    message
    errorCode
    data {
      _id
      name
      value
    }
  }
}
`
export const Get_Country = gql`
query Country {
  country {
    status
    message
    errorCode
    data {
      _id
      name
    }
  }
}
`

export const Get_Address = gql`
query GetAddress {
  getAddress {
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
      isDefault
    }
    errorCode
  }
}

`

export const GET_USER_INFORMATION = gql`
query Me {
  me {
    status
    message
    merchant {
      business_data {
        country_id {
          _id
          name
        }
      }
    }
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
      trackerId
      lastSyncSteps
      lastSyncSleep
      savedMerchant {
        _id
        firstname
        lastname
        dob
        securityNo
        apartmentNo
        address
        city
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
          category_id {
            _id
            name
            catImage
          }
          country_id {
            _id
            name
          }
          state_id {
            _id
            name
            value
          }
          subCategory_id {
            _id
            name
            refId {
              _id
              name
              catImage
            }
          }
          timings {
            status
            openingTime
            closingTime
            isOpenDay
          }
        }
        email
        termsAndConditationStatus
        isActive
        isVoid
        userType
        state_id {
          _id
          name
          value
        }
        country_id {
          _id
          name
        }
      }
      purchasedAmount
      sleepsEarnings
      stepsEarnings
      userCart {
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
    }
    errorCode
  }
}
`

export const GET_MRAKETPLACE_CATEGORY = gql`
  query GetMarketplaceCategory {
    getMarketplaceCategory {
      status
      message
      data {
        _id
        primaryCat
        secondaryCat
        tertiaryCat
        discount
        catImage
      }
    }
  }`

export const GET_PRODUCT_MARKETPLACE = gql`
  query GetProducts($limit: Int, $category: String, $offset: Int, $isFeatured: Boolean, $search: String) {
    getProducts(limit: $limit, category: $category, offset: $offset, isFeatured: $isFeatured, search: $search) {
      status
      message
      data {
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
      total
      limit
      offset
      errorCode
    }
}
`

export const GET_VARIANT_MARKETPLACE = gql`
query GetVariants($limit: Int, $category: String, $offset: Int, $isFeatured: Boolean, $search: String) {
  getVariants(limit: $limit, category: $category, offset: $offset, isFeatured: $isFeatured, search: $search) {
    status
    message
    data {
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
    total
    limit
    offset
    errorCode
  }
}
`

export const GET_VARIANT_BY_PRODUCTID = gql`
query GetVariantsByProductId($productId: ID!) {
  getVariantsByProductId(product_id: $productId) {
    status
    message
    data {
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
      variants {
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
      categories {
        _id
        primaryCat
        secondaryCat
        discount
        tertiaryCat
        catImage
      }
      productOptions {
        _id
        product_id
        variant_id
        name
        value
      }
    }
    errorCode
  }
}
`

export const GET_STATE = gql`
query State {
  state {
    status
    message
    errorCode
    data {
      _id
      name
      value
    }
  }
}`
export const GET_COUNTRY = gql`
query Country {
  country {
    status
    message
    errorCode
    data {
      _id
      name
    }
  }
}`

export const CENTZ_SUMMARY = gql`
query CentzBankSummary {
  centzBankSummary {
    status
    message
    data {
      availableBalance {
        totalStepsEarnings
        totalSleepEarnings
        totalEarnings
      }
      currentMonthSummary {
        date
        totalSleepHours
        totalSteps
        totalSleepHoursEarnings
        totalStepsEarnings
      }
      totalSavingsPerMonth
    }
  }
}`

export const USER_STATE_HISTORY = gql`
query UserStatsHistory($startDate: Date!, $endDate: Date!) {
  userStatsHistory(startDate: $startDate, endDate: $endDate) {
    status
    message
    data {
      dateWiseStats {
        date
        totalSteps
        totalSleepHours
      }
      stepsTaken
      totalMiles
      totalCalories
      sleepHours
      centzMade
    }
    errorCode
  }
}`

export const DELETE_USER = gql`
query DeleteAppUser($deleteAppUserId: ID) {
  deleteAppUser(id: $deleteAppUserId) {
    status
    message
    errorCode
  }
}`

export const GET_PRODUCT_SHARE_URL = gql`
  query GetProductShareUrl($variantId: ID!) {
    getProductShareUrl(variantId: $variantId) {
      status
      message
      data {
        url
      }
      errorCode
    }
  }
`

export const GET_FEATURE_DEAL = gql`
query GetDealsByUser($isFeatured: Boolean,$limit: Int,$search: String) {
  getDealsByUser(isFeatured: $isFeatured,limit: $limit,search: $search) {
    status
    message
    data {
      _id
      isActive
      merchant_id {
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
          website
          email
          category_id {
            _id
            name
            catImage
          }
          subCategory_id {
            _id
            name
            refId {
              _id
              name
              catImage
            }
          }
          socialUrl
          phoneno
          businessLogo
          bannerImages
          timings {
            status
            openingTime
            closingTime
            isOpenDay
          }
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
      dealImages
      name
      decription
      price
      discountType
      discountValue
      startDate
      endDate
      featured
    }
  }
}
`