// Data from http://www.usgovernmentspending.com/federal_budget_detail_2015bs22015n_303380817060653231405089_252_051_054_376
// All dollar values are nominal and expressed in billions

// The line items are in the `activities` array. That's an array of objects. Each object
// should have a `name` string, a `spending` number, optionally an `agency_code` string
// (which is specified in many of the fields for the source data), and its own
// `activites` array for subdepartments. This nesting goes exactly one level deep.

export default {
  year: 2015,
  total_spending: 3688.3,
  deficit_spending: 438.4,
  activities: [
    {
      name: 'Social Security, Medicare, and Medicaid',
      activities: [
        {name: 'Social Security', spending: 953.6},
        {name: 'Medicare', spending: 546.2},
        {name: 'Medicaid', agency_code: '551', spending: 446.4},
      ],
    },
    {
      name: 'Military and foreign aid',
      activities: [
        {name: 'Department of Defense and intelligence agencies', agency_code: '051', spending: 562.5},
        {name: 'Department of Energy, section for nuclear-related military activities', agency_code: '053', spending: 18.7},
        {name: 'Uncategorized military spending', agency_code: '054', spending: 8.4},
        {name: 'Veterans Affairs (medical care, income security, education, etc.)', spending: 159.7},
        {name: 'Cash and goods to foreign militaries', agency_code: '152', spending: 12.9},
        {name: 'Cash and goods to foreign non-military programs', agency_code: '', spending: 35.7},
      ],
    },
    {
      name: 'Debt service',
      activities: [
        {name: 'Net interest payments on outstanding debt', spending: 223.2},
      ],
    },
    {
      name: 'Welfare',
      activities: [
        {name: 'Food assistance', agency_code: '605', spending: 104.8},
        {name: 'Income assistance programs', agency_code: '609', spending: 174.3},
        {name: 'Unemployment subsidies', agency_code: '603', spending: 35},
        {name: 'Housing assistance', agency_code: '604', spending: 8},
      ],
    },
    {
      name: 'Law enforcement',
      activities: [
        {name: 'Federal law enforcement agencies (FBI, DEA, ATF, US Marshals Service, etc.)', agency_code: '751', spending: 26.9},
        {name: 'Federal prisons', agency_code: '753', spending: 7},
      ],
    },
    {
      name: 'Science',
      activities: [
        {name: 'Food and Drug Administration', agency_code: '554', spending: 4.5},
        {name: 'National Institutes of Health', agency_code: '552', spending: 31.4},
        {name: 'NASA and supporting activities', agency_code: '252', spending: 17.7},
      ],
    },
    {
      name: 'Education',
      activities: [
        {name: 'Subsidies to K-12 education', agency_code: '501', spending: 40},
        {name: 'Subsidies to higher education (Pell grants, etc.)', agency_code: '502', spending: 51.3},
        {name: 'Other spending not definable by education level', spending: 42.4},
      ],
    },
    {
      name: 'Transportation',
      activities: [
        {name: 'NHTSA, Federal Highway Administration, Federal Railroad Administration, and other ground transportation', agency_code: '401', spending: 59.1},
        {name: 'US Coast Guard and other water transportation', agency_code: '403', spending: 10},
        {name: 'FAA and other air transportation', agency_code: '402', spending: 20},
      ],
    },
    {
      name: 'Agriculture and nature',
      activities: [
        {name: 'Agricultural research and services', agency_code: '352', spending: 5.1},
        {name: 'Farm income subsidies', agency_code: '351', spending: 13.4},
        {name: 'US Forest Service, National Park Service, US Fish and Wildlife Service, and others related to natural resources', agency_code: '306', spending: 7},
        {name: 'Environmental Protection Agency', agency_code: '304', spending: 7.2},
      ],
    },
    {
      name: 'Selected others',
      activities: [
        {name: 'FEMA', agency_code: '453', spending: 9},
        {name: 'Legislative branch', agency_code: '801', spending: 3.8},
        {name: 'Federal courts', agency_code: '752', spending: 14.7},
        {name: 'Legal aid to poor federal defendants', agency_code: '754', spending: 3.2},
      ],
    },
  ],
};
