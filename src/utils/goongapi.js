import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GOONG_API_KEY} from './constant';

export const goongApi = createApi({
  reducerPath: 'goongApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rsapi.goong.io',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    searchLocation: builder.mutation({
      query: (searchQuery, location) => {
        return `/Place/AutoComplete?api_key=${GOONG_API_KEY}&location=${location}&input=${searchQuery}`;
      },
    }),
    geocodeLocation: builder.mutation({
      query: location => `/Geocode?latlng=${location}&api_key=${GOONG_API_KEY}`,
    }),
    getPlaceDetailById: builder.mutation({
      query: id => `/Place/Detail?place_id=${id}&api_key=${GOONG_API_KEY}`,
    }),
    distanceMatrix: builder.mutation({
      query: ({origins, destinations}) =>
        `/DistanceMatrix?origins=${origins}&destinations=${destinations}&vehicle=car&api_key=${GOONG_API_KEY}`,
    }),
    direction: builder.mutation({
      query: ({origin, destination}) =>
        `/Direction?origin=${origin}&destination=${destination}&vehicle=car&api_key=${GOONG_API_KEY}`,
    }),
  }),
});

export const {
  useSearchLocationMutation,
  useGeocodeLocationMutation,
  useGetPlaceDetailByIdMutation,
  useDistanceMatrixMutation,
  useDirectionMutation
} = goongApi;
