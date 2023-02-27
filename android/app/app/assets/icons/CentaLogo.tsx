import React from 'react';
import Gradient from 'react-native-linear-gradient';
import Svg, {Defs, Path, Rect, Stop, LinearGradient} from 'react-native-svg';

export function CentaLogo(props: any) {
  return (
    <Svg width="143" height="68" viewBox="0 0 143 68" fill="none">
      <Path
        d="M62.846 18.8469H35.734C35.4331 18.8469 35.1446 18.7274 34.9319 18.5147C34.7191 18.3019 34.5996 18.0134 34.5996 17.7125C34.5996 17.4117 34.7191 17.1231 34.9319 16.9104C35.1446 16.6976 35.4331 16.5781 35.734 16.5781H62.846C63.1469 16.5781 63.4354 16.6976 63.6481 16.9104C63.8609 17.1231 63.9804 17.4117 63.9804 17.7125C63.9804 18.0134 63.8609 18.3019 63.6481 18.5147C63.4354 18.7274 63.1469 18.8469 62.846 18.8469Z"
        fill="#FF8F50"
      />
      <Path
        d="M70.9486 24.3078H44.7279C44.427 24.3078 44.1385 24.1883 43.9258 23.9756C43.713 23.7629 43.5935 23.4743 43.5935 23.1735C43.5935 22.8726 43.713 22.5841 43.9258 22.3713C44.1385 22.1586 44.427 22.0391 44.7279 22.0391H70.9486C71.2494 22.0391 71.538 22.1586 71.7507 22.3713C71.9635 22.5841 72.083 22.8726 72.083 23.1735C72.083 23.4743 71.9635 23.7629 71.7507 23.9756C71.538 24.1883 71.2494 24.3078 70.9486 24.3078Z"
        fill="#52FF9A"
      />
      <Path
        d="M68.1612 13.385H53.2521C52.9512 13.385 52.6627 13.2655 52.4499 13.0527C52.2372 12.84 52.1177 12.5515 52.1177 12.2506C52.1177 11.9497 52.2372 11.6612 52.4499 11.4485C52.6627 11.2357 52.9512 11.1162 53.2521 11.1162H68.1612C68.4621 11.1162 68.7506 11.2357 68.9634 11.4485C69.1761 11.6612 69.2956 11.9497 69.2956 12.2506C69.2956 12.5515 69.1761 12.84 68.9634 13.0527C68.7506 13.2655 68.4621 13.385 68.1612 13.385Z"
        fill="#00C2FF"
      />
      <Path
        d="M73.5738 29.7698H57.0441C56.7432 29.7698 56.4547 29.6502 56.2419 29.4375C56.0292 29.2248 55.9097 28.9362 55.9097 28.6354C55.9097 28.3345 56.0292 28.046 56.2419 27.8332C56.4547 27.6205 56.7432 27.501 57.0441 27.501H73.5738C73.8746 27.501 74.1632 27.6205 74.3759 27.8332C74.5887 28.046 74.7082 28.3345 74.7082 28.6354C74.7082 28.9362 74.5887 29.2248 74.3759 29.4375C74.1632 29.6502 73.8746 29.7698 73.5738 29.7698Z"
        fill="#00C2FF"
      />
      <Path
        d="M73.574 7.92504H66.1842C65.8833 7.92504 65.5948 7.80552 65.3821 7.59278C65.1693 7.38004 65.0498 7.0915 65.0498 6.79064C65.0498 6.48978 65.1693 6.20125 65.3821 5.98851C65.5948 5.77577 65.8833 5.65625 66.1842 5.65625H73.574C73.8748 5.65625 74.1634 5.77577 74.3761 5.98851C74.5888 6.20125 74.7084 6.48978 74.7084 6.79064C74.7084 7.0915 74.5888 7.38004 74.3761 7.59278C74.1634 7.80552 73.8748 7.92504 73.574 7.92504Z"
        fill="#FF8F50"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89.1635 35.4579H98.8707C101.216 35.4579 103.462 33.9945 105.196 31.3352C106.781 28.9027 107.91 25.519 108.375 21.7917C108.395 21.632 108.381 21.4699 108.334 21.3161C108.286 21.1623 108.206 21.0204 108.1 20.8998C107.993 20.7792 107.862 20.6826 107.716 20.6165C107.569 20.5504 107.41 20.5162 107.249 20.5163H98.5952C98.3211 20.5165 98.0564 20.6159 97.85 20.7961C97.6435 20.9764 97.5093 21.2252 97.4721 21.4967C97.0005 24.9226 95.858 27.9774 94.3444 29.9464C92.557 27.0909 91.3837 22.6328 91.3837 17.7289C91.3837 12.8024 92.5699 8.31996 94.3801 5.46615C95.9131 7.46593 97.0232 10.5029 97.477 14.0016C97.5123 14.2738 97.645 14.5239 97.8506 14.7057C98.0562 14.8875 98.3207 14.9885 98.5952 14.9902H107.257C107.419 14.9914 107.578 14.9582 107.726 14.8926C107.874 14.8271 108.005 14.7309 108.113 14.6103C108.22 14.4897 108.301 14.3476 108.349 14.1934C108.397 14.0393 108.411 13.8767 108.391 13.7164C107.926 9.97618 106.797 6.58272 105.21 4.14215C103.521 1.54494 101.346 0.0818716 99.0645 0.00333546C99.0315 0.00112531 98.9982 0 98.9646 0H89.3482C89.3149 0 89.2818 0.00109052 89.2491 0.00323296C89.2207 0.00108524 89.1922 0 89.1635 0C83.6925 0 79.4077 7.7868 79.4077 17.7289C79.4077 27.6711 83.6925 35.4579 89.1635 35.4579ZM91.6668 5.65576C92.346 4.31456 93.1403 3.1701 94.0239 2.26879H89.3482C89.315 2.26879 89.2821 2.26769 89.2495 2.26552C89.221 2.26769 89.1923 2.26879 89.1635 2.26879C87.4432 2.26879 85.834 3.54528 84.5517 5.65576H91.6668ZM90.6957 7.92455C90.338 8.9204 90.0343 9.98879 89.7916 11.117H82.4239C82.6952 9.97109 83.0336 8.89915 83.4277 7.92455H90.6957ZM89.1342 16.5783C89.1711 15.4816 89.2605 14.4147 89.3981 13.3858H81.9907C81.8392 14.4133 81.7395 15.482 81.6981 16.5783H89.1342ZM89.1331 18.8471C89.169 19.9438 89.2573 21.0106 89.3938 22.0396H81.9734C81.8292 21.0281 81.734 19.962 81.6956 18.8471H89.1331ZM90.6841 27.5009C90.328 26.5048 90.0258 25.4364 89.7846 24.3084H82.3978C82.6702 25.471 83.0107 26.5392 83.4036 27.5009H90.6841ZM91.6505 29.7697C92.3333 31.1249 93.1331 32.2805 94.0239 33.1891H89.1635C87.5524 33.1891 85.8905 31.9557 84.5429 29.7697H91.6505ZM95.8256 3.65599C96.7639 2.7663 97.7946 2.26879 98.8707 2.26879C102.023 2.26879 104.904 6.59244 105.951 12.7214H99.574C98.9549 9.01194 97.6244 5.79351 95.8256 3.65599ZM98.8707 33.1891C102.015 33.1891 104.888 28.8849 105.935 22.7851H99.5659C98.9225 26.4784 97.5823 29.6563 95.79 31.763L95.7916 31.7679C96.7364 32.6786 97.7816 33.1891 98.8707 33.1891Z"
        fill="white"
      />
      <Path
        d="M10.6716 64.5156C10.3946 64.4722 10.1109 64.5173 9.86133 64.6444C9.54269 64.8168 9.19783 64.9364 8.84037 64.9985C8.48749 65.0625 8.12952 65.0948 7.7708 65.095C7.16045 65.0982 6.5534 65.0058 5.97198 64.8214C5.43308 64.632 4.94129 64.3302 4.52968 63.9362C4.10251 63.5237 3.77073 63.024 3.55734 62.4716C3.31853 61.8056 3.20323 61.1021 3.21702 60.3953C3.20989 59.7665 3.30848 59.141 3.50873 58.5444C3.70736 58.0046 4.01635 57.5114 4.41624 57.0959C4.8089 56.6748 5.29032 56.3451 5.82613 56.1302C6.4358 55.8967 7.08503 55.7819 7.73839 55.7922C8.10351 55.7873 8.46795 55.8251 8.82417 55.9049C9.17044 55.981 9.50735 56.0943 9.82891 56.2428C10.0783 56.3714 10.3592 56.4272 10.6392 56.4038C10.772 56.3966 10.9012 56.3586 11.0166 56.293C11.132 56.2273 11.2303 56.1357 11.3036 56.0256C11.4214 55.8901 11.5073 55.7302 11.555 55.5576C11.6027 55.3849 11.6109 55.2039 11.5791 55.0277C11.56 54.855 11.4962 54.6901 11.394 54.5491C11.2918 54.4081 11.1546 54.2957 10.9957 54.2229C10.504 53.9688 9.98102 53.7794 9.43998 53.6596C8.88803 53.5274 8.32238 53.4599 7.7546 53.4584C6.78325 53.448 5.81943 53.6285 4.91861 53.9896C4.07076 54.3136 3.29865 54.8066 2.64983 55.4381C2.01121 56.0618 1.50916 56.8097 1.17512 57.6351C0.82574 58.5136 0.649686 59.4507 0.656537 60.3953C0.633195 61.4576 0.843346 62.5122 1.27235 63.4855C1.62878 64.3188 2.15902 65.0676 2.82809 65.6825C3.49249 66.2663 4.26236 66.7196 5.09688 67.0184C5.96055 67.3213 6.87111 67.4711 7.78701 67.461C8.16184 67.4608 8.53596 67.4285 8.90519 67.3644C9.27792 67.3 9.63445 67.2195 9.99097 67.123C10.3578 67.0047 10.7154 66.8594 11.0605 66.6884C11.2113 66.6218 11.3433 66.5194 11.445 66.3903C11.5467 66.2613 11.615 66.1094 11.6439 65.9481C11.6817 65.7694 11.6764 65.5845 11.6285 65.4083C11.5806 65.2321 11.4915 65.0696 11.3684 64.9341C11.2868 64.8212 11.183 64.7259 11.0632 64.654C10.9434 64.582 10.8102 64.535 10.6716 64.5156Z"
        fill="white"
      />
      <Path
        d="M23.9643 55.7117C24.2717 55.7223 24.572 55.6191 24.807 55.422C24.9232 55.3229 25.0156 55.1992 25.0773 55.0599C25.139 54.9206 25.1685 54.7694 25.1635 54.6173C25.1701 54.4626 25.1415 54.3085 25.0798 54.1664C25.018 54.0243 24.9248 53.8978 24.807 53.7965C24.6976 53.6855 24.5662 53.5981 24.4212 53.54C24.2762 53.4818 24.1206 53.4541 23.9643 53.4585H17.3686C17.2088 53.457 17.0504 53.4876 16.9028 53.5484C16.7552 53.6093 16.6215 53.6991 16.5097 53.8125C16.3969 53.9221 16.3084 54.0539 16.2498 54.1994C16.1912 54.3449 16.1638 54.5009 16.1694 54.6575V65.9561C16.1665 66.1136 16.1951 66.2701 16.2535 66.4165C16.312 66.5629 16.399 66.6964 16.5097 66.8091C16.6224 66.9203 16.7566 67.0075 16.9043 67.0656C17.0519 67.1237 17.2099 67.1515 17.3686 67.1471H23.9481C24.2586 67.1597 24.5616 67.0498 24.7908 66.8413C24.907 66.7422 24.9994 66.6185 25.0611 66.4792C25.1228 66.3399 25.1523 66.1887 25.1473 66.0366C25.1489 65.8873 25.1178 65.7395 25.0562 65.6034C24.9947 65.4672 24.9041 65.346 24.7908 65.2479C24.6845 65.1318 24.5541 65.04 24.4086 64.9789C24.2631 64.9177 24.106 64.8887 23.9481 64.8938H18.6165V61.2806H23.073C23.3804 61.2911 23.6807 61.1879 23.9157 60.9908C24.0319 60.8917 24.1243 60.768 24.186 60.6287C24.2477 60.4894 24.2772 60.3382 24.2722 60.1861C24.2788 60.0315 24.2502 59.8773 24.1884 59.7352C24.1267 59.5931 24.0335 59.4666 23.9157 59.3653C23.8063 59.2543 23.6749 59.167 23.5299 59.1088C23.3849 59.0506 23.2293 59.0229 23.073 59.0273H18.6327V55.7117H23.9643Z"
        fill="white"
      />
      <Path
        d="M40.1017 53.4589C39.9579 53.4549 39.8149 53.48 39.6811 53.5325C39.5474 53.5851 39.4259 53.6641 39.3238 53.7647C39.1287 53.981 39.0243 54.2631 39.0321 54.5534V62.942L31.8693 53.8774C31.7583 53.7335 31.6056 53.6267 31.4317 53.5716C31.252 53.4972 31.0592 53.4589 30.8645 53.4589C30.7044 53.4554 30.5453 53.485 30.3974 53.546C30.2495 53.6069 30.1161 53.6979 30.0056 53.813C29.8928 53.9226 29.8043 54.0544 29.7457 54.1999C29.6871 54.3454 29.6597 54.5014 29.6653 54.658V66.0531C29.6546 66.3438 29.7594 66.627 29.957 66.8417C30.0545 66.9439 30.173 67.024 30.3044 67.0768C30.4358 67.1296 30.5771 67.1537 30.7187 67.1475C30.8654 67.1568 31.0125 67.1342 31.1496 67.0814C31.2867 67.0286 31.4106 66.9468 31.5127 66.8417C31.6148 66.7376 31.6948 66.6141 31.7477 66.4786C31.8006 66.3431 31.8254 66.1984 31.8206 66.0531V57.7031L39.0321 66.8015C39.1324 66.9246 39.2681 67.0144 39.4211 67.059C39.5952 67.1082 39.7749 67.1352 39.9558 67.1395C40.1137 67.1408 40.2702 67.1109 40.4163 67.0515C40.5624 66.9921 40.6951 66.9044 40.8067 66.7935C40.9183 66.6827 41.0066 66.5509 41.0664 66.4058C41.1262 66.2607 41.1564 66.1052 41.1551 65.9485V54.5534C41.1657 54.2627 41.061 53.9795 40.8634 53.7647C40.7658 53.6626 40.6474 53.5824 40.516 53.5297C40.3846 53.4769 40.2433 53.4528 40.1017 53.4589Z"
        fill="white"
      />
      <Path
        d="M56.4337 53.7648C56.2045 53.5563 55.9016 53.4464 55.591 53.459H46.8562C46.5412 53.4491 46.2342 53.5584 45.9973 53.7648C45.8836 53.8651 45.7941 53.9895 45.7352 54.1288C45.6763 54.2681 45.6496 54.4187 45.657 54.5695C45.6512 54.7226 45.6785 54.8751 45.7373 55.0167C45.796 55.1583 45.8847 55.2858 45.9973 55.3904C46.2328 55.5991 46.5408 55.7087 46.8562 55.6962H49.9515V65.9486C49.9478 66.1076 49.9777 66.2656 50.0391 66.4125C50.1005 66.5593 50.1921 66.6919 50.308 66.8016C50.4293 66.9146 50.572 67.0027 50.7277 67.0607C50.8835 67.1187 51.0493 67.1455 51.2155 67.1396C51.5562 67.1519 51.888 67.0305 52.1392 66.8016C52.2589 66.6939 52.3541 66.5622 52.4183 66.4151C52.4826 66.268 52.5145 66.1089 52.512 65.9486V55.6962H55.591C55.8984 55.7067 56.1987 55.6035 56.4337 55.4065C56.5515 55.3051 56.6447 55.1786 56.7065 55.0365C56.7682 54.8944 56.7968 54.7403 56.7902 54.5856C56.7968 54.431 56.7682 54.2768 56.7065 54.1347C56.6447 53.9926 56.5515 53.8661 56.4337 53.7648Z"
        fill="white"
      />
      <Path
        d="M73.3816 65.6974L68.5361 54.2379C68.4511 54.0058 68.2917 53.8079 68.0823 53.6746C67.8962 53.5342 67.6678 53.4605 67.4341 53.4654C67.1826 53.4352 66.9287 53.4983 66.7211 53.6424C66.5036 53.7956 66.3393 54.0122 66.2511 54.2621L61.357 65.9469C61.3133 66.0655 61.2913 66.1908 61.2922 66.3171C61.2808 66.5828 61.3738 66.8425 61.5515 67.0414C61.6551 67.1435 61.7797 67.2222 61.9167 67.2722C62.0538 67.3222 62.2 67.3423 62.3456 67.3311C62.5664 67.3339 62.7822 67.2662 62.9614 67.1379C63.1623 66.9927 63.3148 66.7908 63.3989 66.5585L64.4166 64.1765H70.2798L71.291 66.5263C71.3907 66.75 71.5403 66.9481 71.7286 67.1057C71.9147 67.2461 72.1432 67.3199 72.3768 67.315C72.6749 67.3065 72.9576 67.1819 73.1638 66.9681C73.37 66.7542 73.4832 66.4683 73.4788 66.1722C73.4756 66.0094 73.4427 65.8486 73.3816 65.6974ZM65.3809 61.9152L67.3385 57.3378L69.3091 61.9152H65.3809Z"
        fill="white"
      />
      <Path
        d="M89.7773 53.7962C89.6669 53.6865 89.5354 53.6 89.3906 53.542C89.2459 53.4839 89.0908 53.4554 88.9346 53.4582C88.4323 53.4582 88.0758 53.6996 87.8489 54.2146L84.2318 63.4482L80.2809 54.2146C80.054 53.7238 79.6975 53.4582 79.1952 53.4582C78.9033 53.4684 78.6235 53.5762 78.4011 53.764C78.2645 53.8597 78.1543 53.9879 78.0806 54.137C78.007 54.2861 77.9723 54.4511 77.9797 54.617C77.9776 54.7032 77.983 54.7893 77.9959 54.8745C78.0156 54.9573 78.0427 55.0381 78.077 55.116L82.9386 66.4467C83.0348 66.668 83.1921 66.8577 83.3924 66.9939C83.5803 67.1037 83.7909 67.1697 84.0082 67.1871C84.2359 67.1834 84.4589 67.1225 84.6564 67.01C84.8885 66.8785 85.0707 66.6749 85.175 66.4306L90.0366 55.1321C90.1112 54.9648 90.1499 54.7839 90.1501 54.6009C90.152 54.4477 90.1196 54.296 90.0551 54.1568C89.9906 54.0176 89.8957 53.8944 89.7773 53.7962Z"
        fill="white"
      />
      <Path
        d="M95.9148 53.459C95.747 53.4522 95.5797 53.4802 95.4235 53.5412C95.2672 53.6021 95.1255 53.6947 95.0073 53.8131C94.8903 53.9186 94.7979 54.0481 94.7363 54.1926C94.6748 54.3371 94.6456 54.4932 94.6507 54.65V65.9486C94.646 66.109 94.6748 66.2687 94.7355 66.4175C94.7961 66.5663 94.8873 66.7009 95.0031 66.8129C95.1188 66.9248 95.2568 67.0117 95.4082 67.0679C95.5595 67.1242 95.721 67.1486 95.8824 67.1396C96.2021 67.1424 96.5103 67.0211 96.7413 66.8016C96.861 66.694 96.9561 66.5622 97.0204 66.4151C97.0847 66.268 97.1166 66.1089 97.114 65.9486V54.65C97.1162 54.4921 97.084 54.3356 97.0197 54.1911C96.9553 54.0467 96.8604 53.9177 96.7413 53.8131C96.6351 53.7012 96.507 53.612 96.3649 53.5512C96.2228 53.4903 96.0696 53.4589 95.9148 53.459Z"
        fill="white"
      />
      <Path
        d="M112.553 53.7809C112.315 53.5868 112.018 53.479 111.71 53.4751V53.459H103.656C103.336 53.4464 103.023 53.5558 102.781 53.7648C102.667 53.8651 102.578 53.9895 102.519 54.1288C102.46 54.2681 102.433 54.4187 102.441 54.5695C102.435 54.7226 102.462 54.8751 102.521 55.0167C102.58 55.1583 102.668 55.2857 102.781 55.3904C103.024 55.5969 103.336 55.706 103.656 55.6962H109.354L101.89 65.2404C101.722 65.4521 101.625 65.7113 101.614 65.9807C101.618 66.1329 101.654 66.2827 101.718 66.421C101.782 66.5593 101.873 66.6833 101.987 66.7855C102.105 66.8999 102.244 66.9902 102.397 67.0509C102.55 67.1117 102.714 67.1418 102.878 67.1396H111.516C111.827 67.1522 112.129 67.0422 112.359 66.8338C112.474 66.7304 112.566 66.6036 112.627 66.462C112.689 66.3203 112.719 66.1672 112.715 66.0129C112.723 65.8604 112.696 65.7081 112.634 65.5683C112.572 65.4285 112.477 65.3052 112.359 65.2082C112.129 64.9997 111.827 64.8898 111.516 64.9024H105.243L112.715 55.3582C112.883 55.1464 112.98 54.8873 112.991 54.6178C112.995 54.4529 112.957 54.2897 112.881 54.1433C112.804 53.997 112.691 53.8723 112.553 53.7809Z"
        fill="white"
      />
      <Path
        d="M125.287 55.7117C125.594 55.7223 125.894 55.6191 126.129 55.422C126.246 55.3229 126.338 55.1992 126.4 55.0599C126.461 54.9206 126.491 54.7694 126.486 54.6173C126.492 54.4626 126.464 54.3085 126.402 54.1664C126.34 54.0243 126.247 53.8978 126.129 53.7965C126.02 53.6855 125.889 53.5981 125.743 53.54C125.598 53.4818 125.443 53.4541 125.287 53.4585H118.691C118.531 53.457 118.373 53.4876 118.225 53.5484C118.077 53.6093 117.944 53.6991 117.832 53.8125C117.719 53.9221 117.631 54.0539 117.572 54.1994C117.513 54.3449 117.486 54.5009 117.492 54.6575V65.9561C117.489 66.1136 117.517 66.2701 117.576 66.4165C117.634 66.5629 117.721 66.6964 117.832 66.8091C117.945 66.9203 118.079 67.0075 118.227 67.0656C118.374 67.1237 118.532 67.1515 118.691 67.1471H125.287C125.597 67.1597 125.9 67.0498 126.129 66.8413C126.246 66.7422 126.338 66.6185 126.4 66.4792C126.461 66.3399 126.491 66.1887 126.486 66.0366C126.487 65.8873 126.456 65.7395 126.395 65.6034C126.333 65.4672 126.243 65.346 126.129 65.2479C126.023 65.1318 125.893 65.04 125.747 64.9789C125.602 64.9177 125.444 64.8887 125.287 64.8938H119.939V61.2806H124.395C124.703 61.2911 125.003 61.1879 125.238 60.9908C125.354 60.8917 125.447 60.768 125.508 60.6287C125.57 60.4894 125.599 60.3382 125.594 60.1861C125.598 60.0319 125.567 59.8789 125.506 59.7373C125.444 59.5957 125.353 59.4689 125.238 59.3653C125.129 59.2543 124.997 59.167 124.852 59.1088C124.707 59.0506 124.552 59.0229 124.395 59.0273H119.955V55.7117H125.287Z"
        fill="white"
      />
      <Path
        d="M142.315 65.964C142.285 65.8094 142.222 65.6632 142.13 65.5353C142.037 65.4075 141.918 65.3011 141.78 65.2236C141.697 65.1876 141.622 65.1347 141.561 65.0681C141.499 65.0016 141.453 64.9229 141.424 64.8373C141.372 64.6307 141.334 64.4211 141.31 64.2096C141.294 63.9682 141.262 63.6785 141.213 63.3566C141.186 63.0166 141.099 62.6841 140.954 62.3748C140.817 62.0595 140.625 61.7707 140.387 61.5218C140.227 61.3408 140.047 61.1788 139.85 61.039C140.137 60.8502 140.398 60.6269 140.63 60.3742C140.979 60.0022 141.258 59.5718 141.456 59.1027C141.667 58.6483 141.777 58.1545 141.78 57.6542C141.799 56.8937 141.608 56.1425 141.229 55.4814C140.878 54.8726 140.376 54.363 139.771 54.0007C139.199 53.6421 138.535 53.4539 137.858 53.4583H132.186C132.026 53.4547 131.867 53.4844 131.719 53.5453C131.572 53.6063 131.438 53.6973 131.328 53.8124C131.216 53.9211 131.128 54.0515 131.069 54.1955C131.011 54.3396 130.983 54.494 130.987 54.6493V65.9479C130.988 66.1141 131.028 66.2778 131.104 66.4259C131.18 66.5739 131.29 66.7024 131.425 66.8009C131.705 67.0233 132.054 67.1427 132.413 67.1389C132.555 67.1445 132.696 67.1201 132.827 67.0674C132.959 67.0147 133.077 66.9348 133.175 66.8331C133.362 66.588 133.459 66.2872 133.451 65.9801V62.1817H137.129C137.398 62.1737 137.667 62.2118 137.923 62.2943C138.131 62.3467 138.321 62.4521 138.474 62.6002C138.623 62.7333 138.74 62.8984 138.815 63.083C138.894 63.277 138.933 63.4852 138.928 63.6946C138.914 64.2535 138.979 64.8116 139.122 65.3524C139.239 65.7272 139.426 66.0767 139.673 66.3824C139.862 66.6056 140.086 66.796 140.338 66.9457C140.511 67.0369 140.697 67.102 140.889 67.1389C141.109 67.1711 141.333 67.1711 141.553 67.1389C141.769 67.0879 141.962 66.9694 142.104 66.8009C142.208 66.6905 142.282 66.5558 142.318 66.4094C142.355 66.263 142.354 66.1098 142.315 65.964ZM138.993 58.9466C138.873 59.2766 138.686 59.5781 138.442 59.8318C138.355 59.9262 138.25 60.0021 138.133 60.0547C138.016 60.1072 137.89 60.1355 137.761 60.1376H133.434V55.6955H137.745C138.102 55.6955 138.426 55.8886 138.734 56.2749C139.054 56.6833 139.22 57.19 139.204 57.7073C139.212 58.1298 139.14 58.5501 138.993 58.9466Z"
        fill="white"
      />
    </Svg>
  );
}
