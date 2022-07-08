import axios from 'axios'

/**
 * 
 * @param {String} method Request Method GET, POST, PUT, DELETE, etc default os GET.
 * @param {String} url URL to request on.
 * @param {Object} body Body is use to set data to be send in request.
 * @param {Boolean} node In order to use node url pass value NODE=true.
 * @returns {Promise} return a Promis of the responce
 */

// PLINTO_URL = https://goplinto-website-service-dev-apim.azure-api.net?r=

// PLINTO_KEY = ac6522e1b1e545b690e08d4d27aaf348

const fetcher = (method, url, body = {}) => (new Promise((resolve, reject) => {
    axios({
        method,
        url: `${process.env.NEXT_PUBLIC_PLINTO_URL}${url}`,
        data: body,
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY
        }
    }).then(function (res) {
        resolve(res)
    }).catch(function (error) {
        if (process.env.NODE_ENV == 'development') {
            console.error(error);
        }
        reject(error)
    });
}));
export const nodefetcher = (method, url, body = {}) => (new Promise((resolve, reject) => {
    axios({
        method,
        url: `${process.env.NEXT_PUBLIC_PLINTO_NODE_URL}${url}`,
        data: body,
    }).then(function (res) {
        resolve(res)
    }).catch(function (error) {
        reject(error)
    });
}));






// const fetcher = (method, url, body = {}) => (new Promise((resolve, reject) => {

//     try {
//         const res = await axios({
//             method,
//             url: `${process.env.NEXT_PUBLIC_PLINTO_URL}${url}`,
//             body,
//             headers: {
//                 'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY
//             }
//         });

//         return resolve(res);
//     } catch (error) {
//         console.error(error);
//         return reject(error)
//     }
// }));
// const fetcher = (method, url, body = {}) => (new Promise(async (resolve, reject) => {
//     try {
//         const res = await axios({
//             method,
//             url: `${process.env.NEXT_PUBLIC_LOCAL_URL}${url}`,
//             body,
//         });
//         const data = res.data;
//         resolve(data);
//     } catch (error) {
//         console.error(error);
//         reject(error)
//     }
// }));


export default fetcher;


export const defaultCountryCode = {
    "Albania": {
        "country_code": "ALB",
        "currency_code": "ALL",
        "country_name": "Albania",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/al.svg",
        "region_timeszone": [
            "Europe/Tirane"
        ],
        "isd_code": [
            355
        ]
    },
    "Algeria": {
        "country_code": "DZA",
        "currency_code": "DZD",
        "country_name": "Algeria",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/dz.svg",
        "region_timeszone": [
            "Africa/Algiers"
        ],
        "isd_code": [
            213
        ]
    },
    "American Samoa": {
        "country_code": "ASM",
        "currency_code": "USD",
        "country_name": "American Samoa",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/as.svg",
        "region_timeszone": [
            "Pacific/Pago_Pago"
        ],
        "isd_code": [
            1684
        ]
    },
    "Andorra": {
        "country_code": "AND",
        "currency_code": "EUR",
        "country_name": "Andorra",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ad.svg",
        "region_timeszone": [
            "Europe/Andorra"
        ],
        "isd_code": [
            376
        ]
    },
    "Argentina": {
        "country_code": "ARG",
        "currency_code": "ARS",
        "country_name": "Argentina",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ar.svg",
        "region_timeszone": [
            "America/Argentina/Salta",
            "America/Argentina/La_Rioja",
            "America/Argentina/Rio_Gallegos",
            "America/Argentina/San_Luis",
            "America/Argentina/Mendoza",
            "America/Argentina/San_Juan",
            "America/Argentina/Buenos_Aires",
            "America/Argentina/Cordoba",
            "America/Argentina/Catamarca",
            "America/Argentina/Tucuman",
            "America/Argentina/Ushuaia",
            "America/Argentina/Jujuy"
        ],
        "isd_code": [
            54
        ]
    },
    "Armenia": {
        "country_code": "ARM",
        "currency_code": "AMD",
        "country_name": "Armenia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/am.svg",
        "region_timeszone": [
            "Asia/Yerevan"
        ],
        "isd_code": [
            374
        ]
    },
    "Aruba": {
        "country_code": "ABW",
        "currency_code": "AWG",
        "country_name": "Aruba",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/aw.svg",
        "region_timeszone": [
            "America/Aruba"
        ],
        "isd_code": [
            297
        ]
    },
    "Australia": {
        "country_code": "AUS",
        "currency_code": "AUD",
        "country_name": "Australia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/au.svg",
        "region_timeszone": [
            "Australia/Sydney",
            "Australia/Adelaide",
            "Australia/Darwin",
            "Australia/Melbourne",
            "Australia/Perth",
            "Australia/Brisbane",
            "Australia/Hobart",
            "Australia/Eucla",
            "Australia/Broken_Hill",
            "Australia/Lindeman",
            "Australia/Lord_Howe",
            "Antarctica/Macquarie"
        ],
        "isd_code": [
            61
        ]
    },
    "Austria": {
        "country_code": "AUT",
        "currency_code": "EUR",
        "country_name": "Austria",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/at.svg",
        "region_timeszone": [
            "Europe/Vienna"
        ],
        "isd_code": [
            43
        ]
    },
    "Bahamas": {
        "country_code": "BHS",
        "currency_code": "BSD",
        "country_name": "Bahamas",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bs.svg",
        "region_timeszone": [
            "America/Nassau"
        ],
        "isd_code": [
            1242
        ]
    },
    "Bangladesh": {
        "country_code": "BGD",
        "currency_code": "BDT",
        "country_name": "Bangladesh",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bd.svg",
        "region_timeszone": [
            "Asia/Dhaka"
        ],
        "isd_code": [
            880
        ]
    },
    "Barbados": {
        "country_code": "BRB",
        "currency_code": "BBD",
        "country_name": "Barbados",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bb.svg",
        "region_timeszone": [
            "America/Barbados"
        ],
        "isd_code": [
            1246
        ]
    },
    "Belgium": {
        "country_code": "BEL",
        "currency_code": "EUR",
        "country_name": "Belgium",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/be.svg",
        "region_timeszone": [
            "Europe/Brussels"
        ],
        "isd_code": [
            32
        ]
    },
    "Belize": {
        "country_code": "BLZ",
        "currency_code": "BZD",
        "country_name": "Belize",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bz.svg",
        "region_timeszone": [
            "America/Belize"
        ],
        "isd_code": [
            501
        ]
    },
    "Bermuda": {
        "country_code": "BMU",
        "currency_code": "BMD",
        "country_name": "Bermuda",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bm.svg",
        "region_timeszone": [
            "Atlantic/Bermuda"
        ],
        "isd_code": [
            1441
        ]
    },
    "Bolivia": {
        "country_code": "BOL",
        "currency_code": "BOB",
        "country_name": "Bolivia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bo.svg",
        "region_timeszone": [
            "America/La_Paz"
        ],
        "isd_code": [
            591
        ]
    },
    "Botswana": {
        "country_code": "BWA",
        "currency_code": "BWP",
        "country_name": "Botswana",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bw.svg",
        "region_timeszone": [
            "Africa/Gaborone"
        ],
        "isd_code": [
            267
        ]
    },
    "British Indian Ocean Territory": {
        "country_code": "IOT",
        "currency_code": "USD",
        "country_name": "British Indian Ocean Territory",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/io.svg",
        "region_timeszone": [
            "Indian/Chagos"
        ],
        "isd_code": [
            246
        ]
    },
    "British Virgin Islands": {
        "country_code": "VGB",
        "currency_code": "USD",
        "country_name": "British Virgin Islands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/vg.svg",
        "region_timeszone": [
            "America/Tortola"
        ],
        "isd_code": [
            1284
        ]
    },
    "Brunei": {
        "country_code": "BRN",
        "currency_code": "BND",
        "country_name": "Brunei",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bn.svg",
        "region_timeszone": [
            "Asia/Brunei"
        ],
        "isd_code": [
            673
        ]
    },
    "Cambodia": {
        "country_code": "KHM",
        "currency_code": "KHR",
        "country_name": "Cambodia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/kh.svg",
        "region_timeszone": [
            "Asia/Phnom_Penh"
        ],
        "isd_code": [
            855
        ]
    },
    "Canada": {
        "country_code": "CAN",
        "currency_code": "CAD",
        "country_name": "Canada",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ca.svg",
        "region_timeszone": [
            "America/Toronto",
            "America/Moncton",
            "America/Rainy_River",
            "America/Vancouver",
            "America/Atikokan",
            "America/Blanc-Sablon",
            "America/Glace_Bay",
            "America/Edmonton",
            "America/Dawson_Creek",
            "America/Dawson",
            "America/Fort_Nelson",
            "America/Halifax",
            "America/Pangnirtung",
            "America/Nipigon",
            "America/Goose_Bay",
            "America/Iqaluit",
            "America/Creston",
            "America/Rankin_Inlet",
            "America/St_Johns",
            "America/Regina",
            "America/Thunder_Bay",
            "America/Winnipeg",
            "America/Inuvik",
            "America/Swift_Current",
            "America/Yellowknife",
            "America/Cambridge_Bay",
            "America/Resolute",
            "America/Whitehorse"
        ],
        "isd_code": [
            1
        ]
    },
    "Cape Verde": {
        "country_code": "CPV",
        "currency_code": "USD",
        "country_name": "Cape Verde",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cv.svg",
        "region_timeszone": [
            "Atlantic/Cape_Verde"
        ],
        "isd_code": [
            238
        ]
    },
    "Cayman Islands": {
        "country_code": "CYM",
        "currency_code": "KYD",
        "country_name": "Cayman Islands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ky.svg",
        "region_timeszone": [
            "America/Cayman"
        ],
        "isd_code": [
            1345
        ]
    },
    "China": {
        "country_code": "CHN",
        "currency_code": "CNY",
        "country_name": "China",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cn.svg",
        "region_timeszone": [
            "Asia/Shanghai",
            "Asia/Urumqi"
        ],
        "isd_code": [
            86
        ]
    },
    "Christmas Island": {
        "country_code": "CXR",
        "currency_code": "AUD",
        "country_name": "Christmas Island",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cx.svg",
        "region_timeszone": [
            "Indian/Christmas"
        ],
        "isd_code": [
            61
        ]
    },
    "Cocos Islands": {
        "country_code": "CCK",
        "currency_code": "AUD",
        "country_name": "Cocos Islands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cc.svg",
        "region_timeszone": [
            "Indian/Cocos"
        ],
        "isd_code": [
            61
        ]
    },
    "Colombia": {
        "country_code": "COL",
        "currency_code": "COP",
        "country_name": "Colombia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/co.svg",
        "region_timeszone": [
            "America/Bogota"
        ],
        "isd_code": [
            57
        ]
    },
    "Costa Rica": {
        "country_code": "CRI",
        "currency_code": "CRC",
        "country_name": "Costa Rica",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cr.svg",
        "region_timeszone": [
            "America/Costa_Rica"
        ],
        "isd_code": [
            506
        ]
    },
    "Croatia": {
        "country_code": "HRV",
        "currency_code": "HRK",
        "country_name": "Croatia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/hr.svg",
        "region_timeszone": [
            "Europe/Zagreb"
        ],
        "isd_code": [
            385
        ]
    },
    "Cuba": {
        "country_code": "CUB",
        "currency_code": "CUP",
        "country_name": "Cuba",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cu.svg",
        "region_timeszone": [
            "America/Havana"
        ],
        "isd_code": [
            53
        ]
    },
    "Cyprus": {
        "country_code": "CYP",
        "currency_code": "EUR",
        "country_name": "Cyprus",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cy.svg",
        "region_timeszone": [
            "Asia/Famagusta",
            "Asia/Nicosia"
        ],
        "isd_code": [
            357
        ]
    },
    "Czech Republic": {
        "country_code": "CZE",
        "currency_code": "CZK",
        "country_name": "Czech Republic",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cz.svg",
        "region_timeszone": [
            "Europe/Prague"
        ],
        "isd_code": [
            420
        ]
    },
    "Democratic Republic of the Congo": {
        "country_code": "COD",
        "currency_code": "CDF",
        "country_name": "Democratic Republic of the Congo",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/cd.svg",
        "region_timeszone": [
            "Africa/Lubumbashi",
            "Africa/Kinshasa"
        ],
        "isd_code": [
            243
        ]
    },
    "Dominica": {
        "country_code": "DMA",
        "currency_code": "DOP",
        "country_name": "Dominica",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/dm.svg",
        "region_timeszone": [
            "America/Dominica"
        ],
        "isd_code": [
            1767
        ]
    },
    "Dominican Republic": {
        "country_code": "DOM",
        "currency_code": "USD",
        "country_name": "Dominican Republic",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/do.svg",
        "region_timeszone": [
            "America/Santo_Domingo"
        ],
        "isd_code": [
            1809
        ]
    },
    "Ecuador": {
        "country_code": "ECU",
        "currency_code": "EGP",
        "country_name": "Ecuador",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ec.svg",
        "region_timeszone": [
            "Pacific/Galapagos",
            "America/Guayaquil"
        ],
        "isd_code": [
            593
        ]
    },
    "Egypt": {
        "country_code": "EGY",
        "currency_code": "USD",
        "country_name": "Egypt",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/eg.svg",
        "region_timeszone": [
            "Africa/Cairo"
        ],
        "isd_code": [
            20
        ]
    },
    "Eritrea": {
        "country_code": "ERI",
        "currency_code": "EUR",
        "country_name": "Eritrea",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/er.svg",
        "region_timeszone": [
            "Africa/Asmara"
        ],
        "isd_code": [
            291
        ]
    },
    "Estonia": {
        "country_code": "EST",
        "currency_code": "SZL",
        "country_name": "Estonia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ee.svg",
        "region_timeszone": [
            "Europe/Tallinn"
        ],
        "isd_code": [
            372
        ]
    },
    "Ethiopia": {
        "country_code": "ETH",
        "currency_code": "ETB",
        "country_name": "Ethiopia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/et.svg",
        "region_timeszone": [
            "Africa/Addis_Ababa"
        ],
        "isd_code": [
            251
        ]
    },
    "Fiji": {
        "country_code": "FJI",
        "currency_code": "FJD",
        "country_name": "Fiji",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/fj.svg",
        "region_timeszone": [
            "Pacific/Fiji"
        ],
        "isd_code": [
            679
        ]
    },
    "Finland": {
        "country_code": "FIN",
        "currency_code": "EUR",
        "country_name": "Finland",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/fi.svg",
        "region_timeszone": [
            "Europe/Helsinki"
        ],
        "isd_code": [
            358
        ]
    },
    "France": {
        "country_code": "FRA",
        "currency_code": "EUR",
        "country_name": "France",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/fr.svg",
        "region_timeszone": [
            "Europe/Paris"
        ],
        "isd_code": [
            33
        ]
    },
    "Gambia": {
        "country_code": "GMB",
        "currency_code": "GMD",
        "country_name": "Gambia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gm.svg",
        "region_timeszone": [
            "Africa/Banjul"
        ],
        "isd_code": [
            220
        ]
    },
    "Germany": {
        "country_code": "DEU",
        "currency_code": "EUR",
        "country_name": "Germany",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/de.svg",
        "region_timeszone": [
            "Europe/Berlin",
            "Europe/Busingen"
        ],
        "isd_code": [
            49
        ]
    },
    "Ghana": {
        "country_code": "GHA",
        "currency_code": "GHS",
        "country_name": "Ghana",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gh.svg",
        "region_timeszone": [
            "Africa/Accra"
        ],
        "isd_code": [
            233
        ]
    },
    "Gibraltar": {
        "country_code": "GIB",
        "currency_code": "GIP",
        "country_name": "Gibraltar",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gi.svg",
        "region_timeszone": [
            "Europe/Gibraltar"
        ],
        "isd_code": [
            350
        ]
    },
    "Greece": {
        "country_code": "GRC",
        "currency_code": "EUR",
        "country_name": "Greece",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gr.svg",
        "region_timeszone": [
            "Europe/Athens"
        ],
        "isd_code": [
            30
        ]
    },
    "Greenland": {
        "country_code": "GRL",
        "currency_code": "DKK",
        "country_name": "Greenland",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gl.svg",
        "region_timeszone": [
            "America/Thule",
            "America/Scoresbysund",
            "America/Nuuk",
            "America/Danmarkshavn"
        ],
        "isd_code": [
            299
        ]
    },
    "Guam": {
        "country_code": "GUM",
        "currency_code": "USD",
        "country_name": "Guam",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gu.svg",
        "region_timeszone": [
            "Pacific/Guam"
        ],
        "isd_code": [
            1671
        ]
    },
    "Guatemala": {
        "country_code": "GTM",
        "currency_code": "GTQ",
        "country_name": "Guatemala",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gt.svg",
        "region_timeszone": [
            "America/Guatemala"
        ],
        "isd_code": [
            502
        ]
    },
    "Guyana": {
        "country_code": "GUY",
        "currency_code": "GYD",
        "country_name": "Guyana",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gy.svg",
        "region_timeszone": [
            "America/Guyana"
        ],
        "isd_code": [
            592
        ]
    },
    "Haiti": {
        "country_code": "HTI",
        "currency_code": "HTG",
        "country_name": "Haiti",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ht.svg",
        "region_timeszone": [
            "America/Port-au-Prince"
        ],
        "isd_code": [
            509
        ]
    },
    "Honduras": {
        "country_code": "HND",
        "currency_code": "HNL",
        "country_name": "Honduras",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/hn.svg",
        "region_timeszone": [
            "America/Tegucigalpa"
        ],
        "isd_code": [
            504
        ]
    },
    "Hong Kong": {
        "country_code": "HKG",
        "currency_code": "HKD",
        "country_name": "Hong Kong",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/hk.svg",
        "region_timeszone": [
            "Asia/Hong_Kong"
        ],
        "isd_code": [
            852
        ]
    },
    "Hungary": {
        "country_code": "HUN",
        "currency_code": "HUF",
        "country_name": "Hungary",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/hu.svg",
        "region_timeszone": [
            "Europe/Budapest"
        ],
        "isd_code": [
            36
        ]
    },
    "India": {
        "country_code": "IND",
        "currency_code": "INR",
        "country_name": "India",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/in.svg",
        "region_timeszone": [
            "Asia/Kolkata"
        ],
        "isd_code": [
            91
        ]
    },
    "Indonesia": {
        "country_code": "IDN",
        "currency_code": "IDR",
        "country_name": "Indonesia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/id.svg",
        "region_timeszone": [
            "Asia/Jayapura",
            "Asia/Pontianak",
            "Asia/Jakarta",
            "Asia/Makassar"
        ],
        "isd_code": [
            62
        ]
    },
    "Ireland": {
        "country_code": "IRL",
        "currency_code": "EUR",
        "country_name": "Ireland",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ie.svg",
        "region_timeszone": [
            "Europe/Dublin"
        ],
        "isd_code": [
            353
        ]
    },
    "Israel": {
        "country_code": "ISR",
        "currency_code": "ILS",
        "country_name": "Israel",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/il.svg",
        "region_timeszone": [
            "Asia/Jerusalem"
        ],
        "isd_code": [
            972
        ]
    },
    "Italy": {
        "country_code": "ITA",
        "currency_code": "EUR",
        "country_name": "Italy",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/it.svg",
        "region_timeszone": [
            "Europe/Rome"
        ],
        "isd_code": [
            39
        ]
    },
    "Jamaica": {
        "country_code": "JAM",
        "currency_code": "JMD",
        "country_name": "Jamaica",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/jm.svg",
        "region_timeszone": [
            "America/Jamaica"
        ],
        "isd_code": [
            1876
        ]
    },
    "Kazakhstan": {
        "country_code": "KAZ",
        "currency_code": "KZT",
        "country_name": "Kazakhstan",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/kz.svg",
        "region_timeszone": [
            "Asia/Oral",
            "Asia/Almaty",
            "Asia/Atyrau",
            "Asia/Aqtau",
            "Asia/Qostanay",
            "Asia/Qyzylorda",
            "Asia/Aqtobe"
        ],
        "isd_code": [
            76
        ]
    },
    "Kenya": {
        "country_code": "KEN",
        "currency_code": "KES",
        "country_name": "Kenya",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ke.svg",
        "region_timeszone": [
            "Africa/Nairobi"
        ],
        "isd_code": [
            254
        ]
    },
    "Kiribati": {
        "country_code": "KIR",
        "currency_code": "AUD",
        "country_name": "Kiribati",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ki.svg",
        "region_timeszone": [
            "Pacific/Kiritimati",
            "Pacific/Tarawa",
            "Pacific/Kanton"
        ],
        "isd_code": [
            686
        ]
    },
    "Kosovo": {
        "country_code": "XK",
        "currency_code": "EUR",
        "country_name": "Kosovo",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/xk.svg",
        "region_timeszone": [
            "Europe/Belgrade"
        ],
        "isd_code": [
            383
        ]
    },
    "Kyrgyzstan": {
        "country_code": "KGZ",
        "currency_code": "KGS",
        "country_name": "Kyrgyzstan",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/kg.svg",
        "region_timeszone": [
            "Asia/Bishkek"
        ],
        "isd_code": [
            996
        ]
    },
    "Laos": {
        "country_code": "LAO",
        "currency_code": "LAK",
        "country_name": "Laos",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/la.svg",
        "region_timeszone": [
            "Asia/Vientiane"
        ],
        "isd_code": [
            856
        ]
    },
    "Latvia": {
        "country_code": "LVA",
        "currency_code": "EUR",
        "country_name": "Latvia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/lv.svg",
        "region_timeszone": [
            "Europe/Riga"
        ],
        "isd_code": [
            371
        ]
    },
    "Lebanon": {
        "country_code": "LBN",
        "currency_code": "LBP",
        "country_name": "Lebanon",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/lb.svg",
        "region_timeszone": [
            "Asia/Beirut"
        ],
        "isd_code": [
            961
        ]
    },
    "Lesotho": {
        "country_code": "LSO",
        "currency_code": "LSL",
        "country_name": "Lesotho",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ls.svg",
        "region_timeszone": [
            "Africa/Maseru"
        ],
        "isd_code": [
            266
        ]
    },
    "Liberia": {
        "country_code": "LBR",
        "currency_code": "LRD",
        "country_name": "Liberia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/lr.svg",
        "region_timeszone": [
            "Africa/Monrovia"
        ],
        "isd_code": [
            231
        ]
    },
    "Liechtenstein": {
        "country_code": "LIE",
        "currency_code": "CHF",
        "country_name": "Liechtenstein",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/li.svg",
        "region_timeszone": [
            "Europe/Vaduz"
        ],
        "isd_code": [
            423
        ]
    },
    "Lithuania": {
        "country_code": "LTU",
        "currency_code": "EUR",
        "country_name": "Lithuania",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/lt.svg",
        "region_timeszone": [
            "Europe/Vilnius"
        ],
        "isd_code": [
            370
        ]
    },
    "Luxembourg": {
        "country_code": "LUX",
        "currency_code": "EUR",
        "country_name": "Luxembourg",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/lu.svg",
        "region_timeszone": [
            "Europe/Luxembourg"
        ],
        "isd_code": [
            352
        ]
    },
    "Macau": {
        "country_code": "MAC",
        "currency_code": "MOP",
        "country_name": "Macau",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mo.svg",
        "region_timeszone": [
            "Asia/Macau"
        ],
        "isd_code": [
            853
        ]
    },
    "Malawi": {
        "country_code": "MWI",
        "currency_code": "MWK",
        "country_name": "Malawi",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mw.svg",
        "region_timeszone": [
            "Africa/Blantyre"
        ],
        "isd_code": [
            265
        ]
    },
    "Malaysia": {
        "country_code": "MYS",
        "currency_code": "MYR",
        "country_name": "Malaysia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/my.svg",
        "region_timeszone": [
            "Asia/Kuala_Lumpur",
            "Asia/Kuching"
        ],
        "isd_code": [
            60
        ]
    },
    "Maldives": {
        "country_code": "MDV",
        "currency_code": "MVR",
        "country_name": "Maldives",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mv.svg",
        "region_timeszone": [
            "Indian/Maldives"
        ],
        "isd_code": [
            960
        ]
    },
    "Malta": {
        "country_code": "MLT",
        "currency_code": "EUR",
        "country_name": "Malta",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mt.svg",
        "region_timeszone": [
            "Europe/Malta"
        ],
        "isd_code": [
            356
        ]
    },
    "Marshall Islands": {
        "country_code": "MHL",
        "currency_code": "USD",
        "country_name": "Marshall Islands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mh.svg",
        "region_timeszone": [
            "Pacific/Kwajalein",
            "Pacific/Majuro"
        ],
        "isd_code": [
            692
        ]
    },
    "Mauritius": {
        "country_code": "MUS",
        "currency_code": "MUR",
        "country_name": "Mauritius",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mu.svg",
        "region_timeszone": [
            "Indian/Mauritius"
        ],
        "isd_code": [
            230
        ]
    },
    "Mayotte": {
        "country_code": "MYT",
        "currency_code": "EUR",
        "country_name": "Mayotte",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/yt.svg",
        "region_timeszone": [
            "Indian/Mayotte"
        ],
        "isd_code": [
            262
        ]
    },
    "Mexico": {
        "country_code": "MEX",
        "currency_code": "MXN",
        "country_name": "Mexico",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mx.svg",
        "region_timeszone": [
            "America/Bahia_Banderas",
            "America/Cancun",
            "America/Chihuahua",
            "America/Mazatlan",
            "America/Tijuana",
            "America/Ojinaga",
            "America/Hermosillo",
            "America/Matamoros",
            "America/Monterrey",
            "America/Mexico_City",
            "America/Merida"
        ],
        "isd_code": [
            52
        ]
    },
    "Micronesia": {
        "country_code": "FSM",
        "currency_code": "USD",
        "country_name": "Micronesia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/fm.svg",
        "region_timeszone": [
            "Pacific/Pohnpei"
        ],
        "isd_code": [
            691
        ]
    },
    "Moldova": {
        "country_code": "MDA",
        "currency_code": "MDL",
        "country_name": "Moldova",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/md.svg",
        "region_timeszone": [
            "Europe/Chisinau"
        ],
        "isd_code": [
            373
        ]
    },
    "Monaco": {
        "country_code": "MCO",
        "currency_code": "EUR",
        "country_name": "Monaco",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mc.svg",
        "region_timeszone": [
            "Europe/Monaco"
        ],
        "isd_code": [
            377
        ]
    },
    "Mongolia": {
        "country_code": "MNG",
        "currency_code": "MNT",
        "country_name": "Mongolia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mn.svg",
        "region_timeszone": [
            "Asia/Choibalsan",
            "Asia/Hovd",
            "Asia/Ulaanbaatar"
        ],
        "isd_code": [
            976
        ]
    },
    "Montenegro": {
        "country_code": "MNE",
        "currency_code": "EUR",
        "country_name": "Montenegro",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/me.svg",
        "region_timeszone": [
            "Europe/Podgorica"
        ],
        "isd_code": [
            382
        ]
    },
    "Morocco": {
        "country_code": "MAR",
        "currency_code": "MAD",
        "country_name": "Morocco",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ma.svg",
        "region_timeszone": [
            "Africa/Casablanca"
        ],
        "isd_code": [
            212
        ]
    },
    "Myanmar": {
        "country_code": "MMR",
        "currency_code": "MMK",
        "country_name": "Myanmar",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mm.svg",
        "region_timeszone": [
            "Asia/Yangon"
        ],
        "isd_code": [
            95
        ]
    },
    "Namibia": {
        "country_code": "NAM",
        "currency_code": "NAD",
        "country_name": "Namibia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/na.svg",
        "region_timeszone": [
            "Africa/Windhoek"
        ],
        "isd_code": [
            264
        ]
    },
    "Nauru": {
        "country_code": "NRU",
        "currency_code": "AUD",
        "country_name": "Nauru",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/nr.svg",
        "region_timeszone": [
            "Pacific/Nauru"
        ],
        "isd_code": [
            674
        ]
    },
    "Nepal": {
        "country_code": "NPL",
        "currency_code": "NPR",
        "country_name": "Nepal",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/np.svg",
        "region_timeszone": [
            "Asia/Kathmandu"
        ],
        "isd_code": [
            977
        ]
    },
    "Netherlands": {
        "country_code": "NLD",
        "currency_code": "EUR",
        "country_name": "Netherlands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/nl.svg",
        "region_timeszone": [
            "Europe/Amsterdam"
        ],
        "isd_code": [
            31
        ]
    },
    "New Zealand": {
        "country_code": "NZL",
        "currency_code": "NZD",
        "country_name": "New Zealand",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/nz.svg",
        "region_timeszone": [
            "Pacific/Auckland",
            "Pacific/Chatham"
        ],
        "isd_code": [
            64
        ]
    },
    "Nicaragua": {
        "country_code": "NIC",
        "currency_code": "NIO",
        "country_name": "Nicaragua",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ni.svg",
        "region_timeszone": [
            "America/Managua"
        ],
        "isd_code": [
            505
        ]
    },
    "Nigeria": {
        "country_code": "NGA",
        "currency_code": "NGN",
        "country_name": "Nigeria",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ng.svg",
        "region_timeszone": [
            "Africa/Lagos"
        ],
        "isd_code": [
            234
        ]
    },
    "Niue": {
        "country_code": "NIU",
        "currency_code": "NZD",
        "country_name": "Niue",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/nu.svg",
        "region_timeszone": [
            "Pacific/Niue"
        ],
        "isd_code": [
            683
        ]
    },
    "Northern Mariana Islands": {
        "country_code": "MNP",
        "currency_code": "USD",
        "country_name": "Northern Mariana Islands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mp.svg",
        "region_timeszone": [
            "Pacific/Saipan"
        ],
        "isd_code": [
            1670
        ]
    },
    "Norway": {
        "country_code": "NOR",
        "currency_code": "NOK",
        "country_name": "Norway",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/no.svg",
        "region_timeszone": [
            "Europe/Oslo"
        ],
        "isd_code": [
            47
        ]
    },
    "Pakistan": {
        "country_code": "PAK",
        "currency_code": "PKR",
        "country_name": "Pakistan",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pk.svg",
        "region_timeszone": [
            "Asia/Karachi"
        ],
        "isd_code": [
            92
        ]
    },
    "Palau": {
        "country_code": "PLW",
        "currency_code": "USD",
        "country_name": "Palau",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pw.svg",
        "region_timeszone": [
            "Pacific/Palau"
        ],
        "isd_code": [
            680
        ]
    },
    "Palestine": {
        "country_code": "PSE",
        "currency_code": "ILS",
        "country_name": "Palestine",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ps.svg",
        "region_timeszone": [
            "Asia/Gaza",
            "Asia/Hebron"
        ],
        "isd_code": [
            970
        ]
    },
    "Panama": {
        "country_code": "PAN",
        "currency_code": "USD",
        "country_name": "Panama",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pa.svg",
        "region_timeszone": [
            "America/Panama"
        ],
        "isd_code": [
            507
        ]
    },
    "Papua New Guinea": {
        "country_code": "PNG",
        "currency_code": "PGK",
        "country_name": "Papua New Guinea",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pg.svg",
        "region_timeszone": [
            "Pacific/Bougainville",
            "Pacific/Port_Moresby"
        ],
        "isd_code": [
            675
        ]
    },
    "Peru": {
        "country_code": "PER",
        "currency_code": "PEN",
        "country_name": "Peru",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pe.svg",
        "region_timeszone": [
            "America/Lima"
        ],
        "isd_code": [
            51
        ]
    },
    "Philippines": {
        "country_code": "PHL",
        "currency_code": "PHP",
        "country_name": "Philippines",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ph.svg",
        "region_timeszone": [
            "Asia/Manila"
        ],
        "isd_code": [
            63
        ]
    },
    "Pitcairn": {
        "country_code": "PCN",
        "currency_code": "NZD",
        "country_name": "Pitcairn",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pn.svg",
        "region_timeszone": [
            "Pacific/Pitcairn"
        ],
        "isd_code": [
            64
        ]
    },
    "Portugal": {
        "country_code": "PRT",
        "currency_code": "EUR",
        "country_name": "Portugal",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pt.svg",
        "region_timeszone": [
            "Atlantic/Azores",
            "Atlantic/Madeira",
            "Europe/Lisbon"
        ],
        "isd_code": [
            351
        ]
    },
    "Puerto Rico": {
        "country_code": "PRI",
        "currency_code": "USD",
        "country_name": "Puerto Rico",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pr.svg",
        "region_timeszone": [
            "America/Puerto_Rico"
        ],
        "isd_code": [
            1787
        ]
    },
    "Qatar": {
        "country_code": "QAT",
        "currency_code": "QAR",
        "country_name": "Qatar",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/qa.svg",
        "region_timeszone": [
            "Asia/Qatar"
        ],
        "isd_code": [
            974
        ]
    },
    "Reunion": {
        "country_code": "REU",
        "currency_code": "EUR",
        "country_name": "Reunion",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/re.svg",
        "region_timeszone": [
            "Indian/Reunion"
        ],
        "isd_code": [
            262
        ]
    },
    "Russia": {
        "country_code": "RUS",
        "currency_code": "RUB",
        "country_name": "Russia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ru.svg",
        "region_timeszone": [
            "Europe/Astrakhan",
            "Europe/Kaliningrad",
            "Europe/Kirov",
            "Europe/Moscow",
            "Europe/Samara",
            "Europe/Saratov",
            "Europe/Ulyanovsk",
            "Europe/Volgograd",
            "Asia/Anadyr",
            "Asia/Barnaul",
            "Asia/Chita",
            "Asia/Irkutsk",
            "Asia/Kamchatka",
            "Asia/Khandyga",
            "Asia/Krasnoyarsk",
            "Asia/Magadan",
            "Asia/Novokuznetsk",
            "Asia/Novosibirsk",
            "Asia/Omsk",
            "Asia/Sakhalin",
            "Asia/Srednekolymsk",
            "Asia/Tomsk",
            "Asia/Ust-Nera",
            "Asia/Vladivostok",
            "Asia/Yakutsk",
            "Asia/Yekaterinburg"
        ],
        "isd_code": [
            7
        ]
    },
    "Saint Barthelemy": {
        "country_code": "BLM",
        "currency_code": "EUR",
        "country_name": "Saint Barthelemy",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/bl.svg",
        "region_timeszone": [
            "America/St_Barthelemy"
        ],
        "isd_code": [
            590
        ]
    },
    "Saint Martin": {
        "country_code": "MAF",
        "currency_code": "EUR",
        "country_name": "Saint Martin",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/mf.svg",
        "region_timeszone": [
            "America/Marigot"
        ],
        "isd_code": [
            721
        ]
    },
    "Saint Pierre and Miquelon": {
        "country_code": "SPM",
        "currency_code": "EUR",
        "country_name": "Saint Pierre and Miquelon",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/pm.svg",
        "region_timeszone": [
            "America/Miquelon"
        ],
        "isd_code": [
            508
        ]
    },
    "San Marino": {
        "country_code": "SMR",
        "currency_code": "EUR",
        "country_name": "San Marino",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sm.svg",
        "region_timeszone": [
            "Europe/San_Marino"
        ],
        "isd_code": [
            378
        ]
    },
    "Saudi Arabia": {
        "country_code": "SAU",
        "currency_code": "SAR",
        "country_name": "Saudi Arabia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sa.svg",
        "region_timeszone": [
            "Asia/Riyadh"
        ],
        "isd_code": [
            966
        ]
    },
    "Seychelles": {
        "country_code": "SYC",
        "currency_code": "SCR",
        "country_name": "Seychelles",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sc.svg",
        "region_timeszone": [
            "Indian/Mahe"
        ],
        "isd_code": [
            248
        ]
    },
    "Sierra Leone": {
        "country_code": "SLE",
        "currency_code": "SLL",
        "country_name": "Sierra Leone",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sl.svg",
        "region_timeszone": [
            "Africa/Freetown"
        ],
        "isd_code": [
            232
        ]
    },
    "Singapore": {
        "country_code": "SGP",
        "currency_code": "SGD",
        "country_name": "Singapore",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sg.svg",
        "region_timeszone": [
            "Asia/Singapore"
        ],
        "isd_code": [
            65
        ]
    },
    "Sint Maarten": {
        "country_code": "SXM",
        "currency_code": "ANG",
        "country_name": "Sint Maarten",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sx.svg",
        "region_timeszone": [
            "America/Lower_Princes"
        ],
        "isd_code": [
            721
        ]
    },
    "Slovenia": {
        "country_code": "SVN",
        "currency_code": "EUR",
        "country_name": "Slovenia",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/si.svg",
        "region_timeszone": [
            "Europe/Ljubljana"
        ],
        "isd_code": [
            386
        ]
    },
    "Solomon Islands": {
        "country_code": "SLB",
        "currency_code": "EUR",
        "country_name": "Solomon Islands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sb.svg",
        "region_timeszone": [
            "Pacific/Guadalcanal"
        ],
        "isd_code": [
            677
        ]
    },
    "South Africa": {
        "country_code": "ZAF",
        "currency_code": "SOS",
        "country_name": "South Africa",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/za.svg",
        "region_timeszone": [
            "Africa/Johannesburg"
        ],
        "isd_code": [
            27
        ]
    },
    "South Korea": {
        "country_code": "KOR",
        "currency_code": "KRW",
        "country_name": "South Korea",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/kr.svg",
        "region_timeszone": [
            "Asia/Seoul"
        ],
        "isd_code": [
            82
        ]
    },
    "Spain": {
        "country_code": "ESP",
        "currency_code": "SSP",
        "country_name": "Spain",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/es.svg",
        "region_timeszone": [
            "Europe/Madrid",
            "Atlantic/Canary",
            "Africa/Ceuta"
        ],
        "isd_code": [
            34
        ]
    },
    "Sri Lanka": {
        "country_code": "LKA",
        "currency_code": "EUR",
        "country_name": "Sri Lanka",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/lk.svg",
        "region_timeszone": [
            "Asia/Colombo"
        ],
        "isd_code": [
            94
        ]
    },
    "Sudan": {
        "country_code": "SDN",
        "currency_code": "LKR",
        "country_name": "Sudan",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sd.svg",
        "region_timeszone": [
            "Africa/Khartoum"
        ],
        "isd_code": [
            249
        ]
    },
    "Swaziland": {
        "country_code": "SWZ",
        "currency_code": "NOK",
        "country_name": "Swaziland",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/sz.svg",
        "region_timeszone": [
            "Africa/Mbabane"
        ],
        "isd_code": [
            268
        ]
    },
    "Sweden": {
        "country_code": "SWE",
        "currency_code": "SEK",
        "country_name": "Sweden",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/se.svg",
        "region_timeszone": [
            "Europe/Stockholm"
        ],
        "isd_code": [
            46
        ]
    },
    "Switzerland": {
        "country_code": "CHE",
        "currency_code": "CHF",
        "country_name": "Switzerland",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ch.svg",
        "region_timeszone": [
            "Europe/Zurich"
        ],
        "isd_code": [
            41
        ]
    },
    "Tanzania": {
        "country_code": "TZA",
        "currency_code": "TZS",
        "country_name": "Tanzania",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/tz.svg",
        "region_timeszone": [
            "Africa/Dar_es_Salaam"
        ],
        "isd_code": [
            255
        ]
    },
    "Thailand": {
        "country_code": "THA",
        "currency_code": "THB",
        "country_name": "Thailand",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/th.svg",
        "region_timeszone": [
            "Asia/Bangkok"
        ],
        "isd_code": [
            66
        ]
    },
    "Tokelau": {
        "country_code": "TKL",
        "currency_code": "NZD",
        "country_name": "Tokelau",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/tk.svg",
        "region_timeszone": [
            "Pacific/Fakaofo"
        ],
        "isd_code": [
            690
        ]
    },
    "Trinidad and Tobago": {
        "country_code": "TTO",
        "currency_code": "TTD",
        "country_name": "Trinidad and Tobago",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/tt.svg",
        "region_timeszone": [
            "America/Port_of_Spain"
        ],
        "isd_code": [
            1868
        ]
    },
    "Turks and Caicos Islands": {
        "country_code": "TCA",
        "currency_code": "USD",
        "country_name": "Turks and Caicos Islands",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/tc.svg",
        "region_timeszone": [
            "America/Grand_Turk"
        ],
        "isd_code": [
            1649
        ]
    },
    "Tuvalu": {
        "country_code": "TUV",
        "currency_code": "AUD",
        "country_name": "Tuvalu",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/tv.svg",
        "region_timeszone": [
            "Pacific/Funafuti"
        ],
        "isd_code": [
            688
        ]
    },
    "United Arab Emirates": {
        "country_code": "ARE",
        "currency_code": "AED",
        "country_name": "United Arab Emirates",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ae.svg",
        "region_timeszone": [
            "Asia/Dubai"
        ],
        "isd_code": [
            971
        ]
    },
    "United Kingdom": {
        "country_code": "GBR",
        "currency_code": "GBP",
        "country_name": "United Kingdom",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/gb.svg",
        "region_timeszone": [
            "Europe/London"
        ],
        "isd_code": [
            44
        ]
    },
    "United States": {
        "country_code": "USA",
        "currency_code": "USD",
        "country_name": "United States",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/us.svg",
        "region_timeszone": [
            "America/Detroit",
            "America/Indiana/Indianapolis",
            "America/Indiana/Knox",
            "America/Indiana/Marengo",
            "America/Indiana/Petersburg",
            "America/Indiana/Tell_City",
            "America/Indiana/Vevay",
            "America/Indiana/Vincennes",
            "America/Indiana/Winamac",
            "America/Juneau",
            "America/Kentucky/Louisville",
            "America/Kentucky/Monticello",
            "America/Los_Angeles",
            "America/Menominee",
            "America/Metlakatla",
            "America/New_York",
            "America/Nome",
            "America/North_Dakota/Beulah",
            "America/North_Dakota/Center",
            "America/North_Dakota/New_Salem",
            "America/Phoenix",
            "America/Sitka",
            "America/Yakutat",
            "Pacific/Honolulu",
            "America/Anchorage",
            "America/Boise",
            "America/Chicago",
            "America/Denver"
        ],
        "isd_code": [
            1
        ]
    },
    "Uruguay": {
        "country_code": "URY",
        "currency_code": "UYU",
        "country_name": "Uruguay",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/uy.svg",
        "region_timeszone": [
            "America/Montevideo"
        ],
        "isd_code": [
            598
        ]
    },
    "Uzbekistan": {
        "country_code": "UZB",
        "currency_code": "UZS",
        "country_name": "Uzbekistan",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/uz.svg",
        "region_timeszone": [
            "Asia/Samarkand",
            "Asia/Tashkent"
        ],
        "isd_code": [
            998
        ]
    },
    "Vatican": {
        "country_code": "VAT",
        "currency_code": "EUR",
        "country_name": "Vatican",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/va.svg",
        "region_timeszone": [
            "Europe/Vatican"
        ],
        "isd_code": [
            379
        ]
    },
    "Yemen": {
        "country_code": "YEM",
        "currency_code": "YER",
        "country_name": "Yemen",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/ye.svg",
        "region_timeszone": [
            "Asia/Aden"
        ],
        "isd_code": [
            967
        ]
    },
    "Zimbabwe": {
        "country_code": "ZWE",
        "currency_code": "USD",
        "country_name": "Zimbabwe",
        "flag_icons": "https://dsa0i94r8ef09.cloudfront.net/general/flag_icons/zw.svg",
        "region_timeszone": [
            "Africa/Harare"
        ],
        "isd_code": [
            263
        ]
    }
}
