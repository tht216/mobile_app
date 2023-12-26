import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getToken} from './localstorage';
import {API_URL} from './constant';

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'api',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: async headers => {
      const token = await getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Customer', 'Pickup', 'Company', 'Service', 'Noti'],

  // Các endpoints (lệnh gọi request)
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: `auth/login/`,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: `auth/register/`,
        method: 'POST',
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation({
      query: credentials => ({
        url: `auth/updatePassword/`,
        method: 'POST',
        body: credentials,
      }),
    }),
    resend: builder.mutation({
      query: id => ({
        url: `auth/resend/${id}`,
        method: 'POST',
        body: id,
      }),
    }),
    verifyAccount: builder.mutation({
      query: ({id, ...patch}) => ({
        url: `auth/verifyOTP/${id}`,
        method: 'POST',
        body: patch,
      }),
    }),
    getDetail: builder.query({
      query: () => ({
        url: `customer/detail`,
        method: 'GET',
      }),
      providesTags: ['Customer'],
    }),
    updateCustomer: builder.mutation({
      query: ({...patch}) => ({
        url: `customer/detail`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Customer'],
    }),
    getCompany: builder.query({
      query: () => ({
        url: `company/getAllCompany`,
        method: 'GET',
      }),
      providesTags: ['Company'],
    }),
    getFilterCompany: builder.query({
      query: patch => ({
        url: `company/getFilterCompany`,
        method: 'POST',
        body: patch,
      }),
      providesTags: ['Company'],
    }),
    bookPickup: builder.mutation({
      query: patch => ({
        url: `pickup/book`,
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['Pickup'],
    }),
    historyPickup: builder.query({
      query: () => ({
        url: `pickup/getDetailCustomer`,
        method: 'GET',
      }),
      providesTags: ['Pickup'],
    }),
    getDetailCompany: builder.query({
      query: () => ({
        url: `company/detail`,
        method: 'GET',
      }),
      providesTags: ['Company'],
    }),
    updateDetailCompany: builder.mutation({
      query: ({...patch}) => ({
        url: `company/`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Company'],
    }),
    historyPickupCompany: builder.query({
      query: () => ({
        url: `pickup/getDetailCompany`,
        method: 'GET',
      }),
      providesTags: ['Pickup'],
    }),
    statisticPickupByMonthCompany: builder.query({
      query: () => ({
        url: `pickup/getByMonthCompany`,
        method: 'GET',
      }),
      providesTags: ['Pickup'],
    }),
    statisticPickupByServiceCompany: builder.query({
      query: () => ({
        url: `pickup/getByServiceCompany`,
        method: 'GET',
      }),
      providesTags: ['Pickup'],
    }),
    changePickupStatus: builder.mutation({
      query: ({id, ...patch}) => ({
        url: `pickup/changeStatus/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Pickup'],
    }),
    getNoti: builder.query({
      query: () => ({
        url: `noti/`,
        method: 'GET',
      }),
      providesTags: ['Noti'],
    }),
    resetNoti: builder.mutation({
      query: () => ({
        url: `noti/reset`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Noti'],
    }),
    getService: builder.query({
      query: () => ({
        url: `service/`,
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: ({...patch}) => ({
        url: `service/`,
        method: 'DELETE',
        body: patch,
      }),
      invalidatesTags: ['Service'],
    }),
    registerService: builder.mutation({
      query: ({...patch}) => ({
        url: `service/register`,
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['Service'],
    }),
    ratingPickup: builder.mutation({
      query: ({...patch}) => ({
        url: `pickup/rating`,
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['Pickup'],
    }),
    getPickupById: builder.query({
      query: ({id}) => ({
        url: `pickup/${id}`,
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useResendMutation,
  useVerifyAccountMutation,
  useGetDetailQuery,
  useGetCompanyQuery,
  useGetFilterCompanyQuery,
  useBookPickupMutation,
  useHistoryPickupQuery,
  useGetDetailCompanyQuery,
  useHistoryPickupCompanyQuery,
  useStatisticPickupByMonthCompanyQuery,
  useStatisticPickupByServiceCompanyQuery,
  useChangePickupStatusMutation,
  useGetNotiQuery,
  useResetNotiMutation,
  useUpdateDetailCompanyMutation,
  useGetServiceQuery,
  useDeleteServiceMutation,
  useRegisterServiceMutation,
  useRatingPickupMutation,
  useUpdateCustomerMutation,
  useGetPickupByIdQuery,
  useUpdatePasswordMutation,
} = api;
