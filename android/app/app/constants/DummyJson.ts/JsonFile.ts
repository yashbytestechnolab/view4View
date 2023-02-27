import { Image } from "react-native-svg";
import { Images } from "../../assets";
import { HomeServices } from "../../assets/icons/ HomeServices";
import { Activity } from "../../assets/icons/Activity";
import { Art } from "../../assets/icons/Art";
import { Automotive } from "../../assets/icons/Automotive";
import { Bar_Nightlife } from "../../assets/icons/Bar_Nightlife";
import { Beauty_Spas } from "../../assets/icons/Beauty_Spas";
import { Coffee } from "../../assets/icons/Coffee";
import { Doller } from "../../assets/icons/Doller";
import { Education } from "../../assets/icons/Education";
import { Event_Planning } from "../../assets/icons/Event_Planning";
import { Glass } from "../../assets/icons/Glass";
import { Gym } from "../../assets/icons/Gym";
import { Health_Medical } from "../../assets/icons/Health_Medical";
import { Hotels_Travel } from "../../assets/icons/Hotels_Travel";
import { Local_Services_Repair } from "../../assets/icons/Local_Services_Repair";
import Percentage from "../../assets/icons/Percentage";
import { PetSupplies_Veterinary } from "../../assets/icons/PetSupplies_Veterinary";
import { Professional_Services } from "../../assets/icons/Professional_Services";
import { Real_Estate } from "../../assets/icons/Real_Estate";
import { Restaurants_FoodServices } from "../../assets/icons/Restaurants_FoodServices";
import { Retail_OnlineShopping } from "../../assets/icons/Retail_OnlineShopping";
import { Union } from "../../assets/icons/Union";
import { Colour } from "../../theme";
import { String } from "../String";
import * as Icons from '../../assets/icons'
import CentZBank2 from "../../assets/icons/CentzBank2";
import { Smiley } from "../../assets/icons/Smiley";
import { Foot } from "../../assets/icons/Foot";
import { Purches } from "../../assets/icons/Purches";

export const cartItem = [
    {
        id: 1,
        image: Images.headPhone,
        title: 'Sony Overear Headphones',
        size: 'One Size',
        price: '$25.00',
        offerPrice: '$20.00',
        dicountPrice: '-$1.25 Centz discount',
    },
    {
        id: 2,
        image: Images.mobile,
        title: 'Oppo reno 6 pro+',
        size: 'Two Size',
        price: '$35.00',
        offerPrice: '$32.00',
        dicountPrice: '-$0.50 Centz discount',
    },
    {
        id: 3,
        image: Images.waterBottal,
        title: '705 Sports Water Bottle',
        size: 'three size',
        price: '$9.50',
        offerPrice: '$5.90',
        dicountPrice: '-$0.50 Centz discount',
    },
];
export const data = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
];
export const Quantity = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
];
export const Pages = [
    {
        image: Images.headPhone,
    },
    {
        image: Images.colorBrush,
    },
    {
        image: Images.gym,
    },
];
export const gender = [
    {
        label: 'Male', value: 'Male', name: '456'
    }, {
        label: 'Female', value: 'Female'
    },
    {
        label: 'Other', value: 'Other'
    }

]

export const data2 = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
];
export const PagesItem = [
    {
        id: 1,
        image: Images.cardBG,
        title: '$5 off iPhone case',
        subTitle: 'Get the deal',
    },
    {
        id: 2,
        image: Images.colorBrush,
        title: String.pageTitle2,
        subTitle: 'Get the deal',
    },
    {
        id: 3,
        image: Images.gym,
        title: String.pageTitle3,
        subTitle: 'Get the deal',
    },
];
export const allCategories = [
    {
        image: Images.shirt,
        categoryName: 'Fashion & Clothing'
    },

    {
        image: Images.colorBrush,
        categoryName: 'Art'
    },
    {
        image: Images.mobile,
        categoryName: 'Technology'
    }, {
        image: Images.gym,
        categoryName: 'Exercise & Fitness'
    },
    {
        image: Images.coffee,
        categoryName: 'Automotive & Marine'
    },
    {
        image: Images.headPhone,
        categoryName: 'Beauty & Spa'
    },
    {
        image: Images.watch,
        categoryName: 'Health & Medical'
    },
    {
        image: '',
        categoryName: 'Automotive & Marine'
    },
    {
        image: '',
        categoryName: 'Exercise & Fitness'
    },
    {
        image: '',
        categoryName: 'Fashion & Clothing'
    },
    {
        image: '',
        categoryName: 'Fashion & Clothing'
    },
    {
        image: '',
        categoryName: 'Fashion & Clothing'
    },
    {
        image: '',
        categoryName: 'Automotive & Marine'
    },
    {
        image: '',
        categoryName: 'Exercise & Fitness'
    },
    {
        image: '',
        categoryName: 'Fashion & Clothing'
    },
    {
        image: '',
        categoryName: 'Fashion & Clothing'
    },
    {
        image: '',
        categoryName: 'Fashion & Clothing'
    },

]
export const serchDeal = [
    {
        image: Images.coffee,
        categoryName: 'Coffee shops'
    },

    {
        image: Images.nightLife,
        categoryName: 'Bars & Nightlife'
    },
    {
        image: Images.health,
        categoryName: 'Health & fitness'
    }, {
        image: Images.shopping,
        categoryName: 'Shopping & retail'
    },

    {
        image: Images.restaurants,
        categoryName: 'Restaurants'
    },
    {
        image: Images.entertainment,
        categoryName: 'Entertainment'
    },
    {
        image: Images.doctor,
        categoryName: 'Health & Medical'
    },
    {
        image: Images.car,
        categoryName: 'Automotive & Marine'
    },
    {
        image: Images.spa,
        categoryName: 'Beauty & Spa'
    },

]
export const data6: any = [
    {
        value: 130,
        label: 'T',
        svg: {
            fill: Colour.PrimaryBlue,
            strokeLinecap: 'round',
        },
    },
    {
        value: 100,
        label: 'F',
        svg: {
            fill: Colour.PrimaryBlue,
            strokeLinecap: 'round',
        },
    },
    {
        value: 120,
        label: 'S',
        svg: {
            fill: Colour.PrimaryBlue,
            strokeLinecap: 'round',
        },
    },
    {
        value: 150,
        label: 'S',
        svg: {
            width: '20%',
            fill: Colour.PrimaryBlue,
            strokeLinecap: 'round',
        },
    },
    {
        value: 150,
        label: 'M',
        svg: {
            width: '20%',
            fill: Colour.PrimaryBlue,
            strokeLinecap: 'round',
        },
    },
    {
        value: 150,

        label: 'T',
        svg: {
            width: '20%',
            fill: Colour.PrimaryBlue,
            strokeLinecap: 'round',
        },
    },
    {
        value: 180,
        label: 'W',

        svg: {
            fill: Colour.blueBarry,
            strokeLinecap: 'round',
        },
    },


];
export const cardItems: any = [
    {
        id: 1,
        image: Images.food,
        svg: Gym,
        title: 'Presidio Golf Course',
        subTitle: '115 New Montgomery St, San Francisco, CA 94105, United States',
        dealText: '2',
    },
    {
        id: 2,
        image: Images.favBg1,
        svg: Union,
        title: 'The Bird',
        subTitle: '115 New Montgomery St, San Francisco, CA 94105, United States',
        dealText: '2',
    },
    {
        id: 3,
        image: Images.FavBg2,
        svg: Glass,
        title: 'Sugar Lounge',
        subTitle: '377 Hayes St, San Francisco, CA 94102, United States',
        dealText: '1',
    },
    {
        id: 4,
        image: Images.FavBg3,
        svg: Art,
        title: 'Snowbird Coffee',
        subTitle: '1352 9th Ave A, San Francisco, CA 94122, United States.',
        dealText: '3',
    },
    {
        id: 5,
        image: Images.FavBg4,
        svg: Union,
        title: 'Golden Gate Theatre',
        subTitle: '1 Taylor St, San Francisco, CA 94102, United States',
        dealText: '4',
    },
];
export const featuredProduct: any = [{
    image: Images.watches,
    number: '5%',
    productName: 'Watch',
    price: '$110.00',

}, {
    image: Images.gym,
    number: '7%',
    productName: 'Head Phone',
    price: '$110.00'
}, {
    image: Images.waterBottal,
    number: '5%',
    productName: 'WaterBottal',
    price: '$110.00'
}, {
    image: Images.gogals,
    number: '8%',
    productName: 'black goggls',
    price: '$110.00'
}]
export const ShopCategoryData = [
    { image: Images.shirt, title: 'Fashion &Clothingkkkkkkkkkkkkkkkkkkkkkkkkk' },
    { image: Images.colorBrush, title: 'Art' },
    { image: Images.mobile, title: 'Technology' },
    { image: Images.gym, title: 'Exercise & Fitness' }]



export const TermsAndCondition: any = {
    tc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales amet pulvinar amet etiam id tortor. Porttitor eget id varius in malesuada scelerisque. Bibendum a orci vulputate morbi vitae. In egestas suspendisse proin lectus lobortis a, nisl consectetur. Ac arcu vitae, rhoncus nibh cras sit tempus, odio eget. Erat lacinia aliquet nec varius proin et turpis risus enim. Libero ut eros, semper molestie aenean integer. Morbi etiam venenatis nec ametVitae eleifend eget facilisi ullamcorper diam. Venenatis, elementum enim massa pretium massa urna, nisl. Id phasellus convallis mi morbi at turpis sed eget. Vitae mattis placerat augue sit at sed vestibulum. Nisl iaculis augue tristique sed nulla aenean odio.',
    tc2: 'Proin risus, feugiat morbi a elit commodo. Ullamcorper placerat elit condimentum ligula malesuada turpis donec tincidunt a. Risus sed turpis pulvinar dolor sed pulvinar.',
    tc3: 'Mauris lorem quis ac pharetra malesuada curabitur tortor sodales. Quis non erat purus elit imperdiet aenean amet erat quis. Diam sodales netus ac dignissim vel in lectus.',
    tc4: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tc5: ' Sodales amet pulvinar amet etiam id tortor. Porttitor eget id varius in malesuada scelerisque. Bibendum a orci vulputate morbi vitae. In egestas suspendisse proin lectus lobortis a, nisl consectetur. Ac arcu vitae, rhoncus nibh cras sit tempus, odio eget. Erat lacinia aliquet nec varius proin et turpis risus enim. Libero ut eros, semper molestie aenean integer. Morbi etiam venenatis nec amet.',
}
export const category = [
    {
        id: 1,
        icon: Activity,
        name: 'Activity & Leisure Entertainment',
    },
    {
        id: 2,
        icon: Art,
        name: 'Arts & Entertainment',
    },
    {
        id: 3,
        icon: Automotive,
        name: 'Automotive & Marine',
    },
    {
        id: 4,
        icon: Glass,
        name: 'Bar&Nightlife',
    },
    {
        id: 5,
        icon: Beauty_Spas,
        name: 'Beauty & Spas',
    },
    {
        id: 6,
        icon: Education,
        name: 'Educations',
    },
    {
        id: 7,
        icon: Event_Planning,
        name: 'Event & Planning Services',
    },
    {
        id: 8,
        icon: Health_Medical,
        name: 'Health & Medical',
    },
    {
        id: 9,
        icon: HomeServices,
        name: 'Contractor & Home Services',
    },
    {
        id: 10,
        icon: Hotels_Travel,
        name: 'Hotels & Travel',
    },
    {
        id: 11,
        icon: Local_Services_Repair,
        name: 'Local Services & Repair',
    },
    {
        id: 12,
        icon: PetSupplies_Veterinary,
        name: 'Pet Supplies & Veterinary',
    },
    {
        id: 13,
        icon: Professional_Services,
        name: 'Professional Services',
    },
    {
        id: 14,
        icon: Real_Estate,
        name: 'Real Estate',
    },
    {
        id: 15,
        icon: Restaurants_FoodServices,
        name: 'Restaurants & Food Services',

    },
    {
        id: 16,
        icon: Retail_OnlineShopping,
        name: 'Retail and Online Shopping',

    },
]
export const DealList: any = [
    {
        image: Images.pizza,
        title: '10% off',
        tagTitle: 'The Bird',
        subText: 'Diam nec duis facilisis est libero fermentum nunc diam habitant',
        tagIcon: Union,
        icon: Doller,
        iconBG: Colour.primaryGreen,
        stepText: 'approx. 2000 steps',
        mailesText: '2.3 miles',
        lineColor: Colour.primaryGreen


    },
    {
        image: Images.ground,
        title: '$5 off green fees',
        tagTitle: 'Presidio Golf Course',
        subText: 'Diam consectetur malesuada diam ac vestibulum et sit vel fermentum',
        tagIcon: Gym,
        icon: Doller,
        iconBG: Colour.peachyOrange,
        stepText: 'approx. 2000 steps',
        mailesText: '2.3 miles',
        lineColor: Colour.peachyOrange


    },
    {
        image: '',
        title: '20% new sneakers',
        tagTitle: 'Urban Outfitters',
        subText: 'Pulvinar pretium nunc, aliquet donec sed in phasellus amet, eget',
        tagIcon: Percentage,
        icon: Doller,
        iconBG: Colour.primaryGreen,
        stepText: 'approx. 2000 steps',
        mailesText: '2.3 miles',
        lineColor: Colour.primaryGreen

    },
    {
        image: Images.cocacoola,
        title: '$2 off cocktails',
        tagTitle: 'Presidio Golf Course',
        subText: 'Diam consectetur malesuada diam ac vestibulum et sit vel fermentum',
        tagIcon: Glass,
        icon: Doller,
        iconBG: Colour.peachyOrange,
        stepText: 'approx. 2000 steps',
        mailesText: '2.3 miles',
        lineColor: Colour.peachyOrange

    },
    {
        image: '',
        title: '$1 off cocktails',
        tagTitle: 'Mazarine Coffee',
        subText: 'Diam consectetur malesuada diam ac vestibulum et sit vel fermentum',
        tagIcon: Glass,
        icon: Doller,
        iconBG: Colour.peachyOrange,
        stepText: 'approx. 2000 steps',
        mailesText: '2.3 miles',
        lineColor: Colour.primaryGreen


    }
]
export function GetIcon(getIconName: string) {
    switch (getIconName) {
        case 'Activity & Leisure Entertainment':
            return Activity;
        case 'Arts & Entertainment':
            return Art;
        case 'Automotive & Marine':
            return Automotive;
        case 'Bar & Nightlife':
            return Glass;
        case 'Beauty & Spas':
            return Beauty_Spas;
        case 'Contractor & Home Services':
            return HomeServices;
        case 'Education':
            return Education;
        case 'Event & Planning Services':
            return Event_Planning;
        case 'Health & Medical':
            return Health_Medical;
        case 'Hotels & Travel':
                return Hotels_Travel;
        
        case 'Local Services & Repair':
            return Local_Services_Repair;

        case 'Pet Supplies & Veterinary':
            return PetSupplies_Veterinary;
        case 'Professional Services':
            return  Professional_Services
        case 'Real Estate':
            return Real_Estate;
        case 'Restaurants & Food Services':
            return Restaurants_FoodServices;
            case 'Retail and Online Shopping':
                return Retail_OnlineShopping;
        default:
            return Icons.Home;
            break;

    }
}
export const RestaurantImage: any = [
    {
        id: 1,
        image: Images.food
    },
    {
        id: 2,
        image: Images.pizaheart
    },
    {
        id: 3,
        image: Images.pizza
    }
]
export const FoodImage: any = [
    {
        id: 1,
        image: Images.pizz3
    },
    {
        id: 2,
        image: Images.food
    },
    {
        id: 3,
        image: Images.pizza
    }
]
export const DayTime: any = [
    {
        id: 1,
        day: 'Monday',
        time: '8am-6pm'
    },
    {
        id: 2,
        day: 'Tuesday',
        time: '8am-6pm'
    },
    {
        id: 3,
        day: 'Wednesday',
        time: '8am-6pm'
    },
    {
        id: 4,
        day: 'Thursday',
        time: '8am-6pm'
    },
    {
        id: 1,
        day: 'Friday',
        time: '8am-6pm'
    },
    {
        id: 1,
        day: 'Saturday',
        time: '10am-4pm'
    },
    {
        id: 1,
        day: 'Sunday',
        time: 'Colsed'
    },
]


export default function ReturnIcon(iconName: string) {
    switch (iconName) {
        case 'Contractor & Home Services':
            return Icons.Pin_HomeServices;
        case 'Restaurants & Food Services':
            return Icons.Pin_Restaurant_Food_Services;
        case 'Pet Supplies & Veterinary':
            return Icons.Pin_Pet_Supplies_Veterinary;
        case 'Beauty & Spas':
            return Icons.Pin_Beauty_Spas;
        case 'Activity & Leisure Entertainment':
            return Icons.Pin_Activity;
        case 'Arts & Entertainment':
            return Icons.Pin_Art;
        case 'Local Services & Repair':
            return Icons.Pin_Local_Services_Repair;
        case 'Automotive & Marine':
            return Icons.Pin_Automotive;
        case 'Contractor & Home Services':
            return Icons.Pin_HomeServices;
        case 'Education':
            return Icons.Pin_Education;
        case 'Event & Planning Services':
            return Icons.Pin_Event_Planning;
        case 'Health & Medical':
            return Icons.Pin_Health_Medical;
        case 'Bar & Nightlife':
            return Icons.Pin_Bar_Nightlife;
        case 'Professional Services':
            return Icons.Pin_Professional_Services
        case 'Real Estate':
            return Icons.Pin_Real_Estate;
        case 'Retail and Online Shopping':
            return Icons.Pin_Retail_online_shopping;


        default:
            return Icons.Deals;
            break;
    }

}
export const addressList: any = [
    {
        id: 1,
        title: 'Home',
        subTitle: 'Address Line 1, Address Line 2 City, State, Postal Code, Country',
        setAddress: 'Default'
    },
    {
        id: 2,
        title: 'Office',
        subTitle: 'Address Line 1, Address Line 2 City, State, Postal Code, Country',
        setAddress: 'Set As Default'

    },
    {
        id: 3,
        title: 'Other',
        subTitle: 'Address Line 1, Address Line 2 City, State, Postal Code, Country',
        setAddress: 'Set As Default'

    }
]

export const centzBankDropDownData :any=[
    {
        value:'allTrancation',
       title:String.allTrancation,
        icon:CentZBank2
        
    },

    {
        value:'sleep',
        title:String.sleep,
        icon:Smiley
        
    },
    {
        value:'movement',
        title:String.movement,
        icon:Foot
        
    },{
        value:'purchase',
        title:String.purchase,
        icon:Purches
        
    }
]
