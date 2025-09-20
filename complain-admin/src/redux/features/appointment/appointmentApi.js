import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";



export const appointmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => `/appointment/get-appointments`,
            keepUnusedDataFor: 600,
            providesTags: ["Appointments"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //ErrorToast("Something Went Wrong!");
                    //do nothing
                    //console.log(err);
                }
            },
        }),
        getRecentAppointments: builder.query({
            query: () => `/appointment/get-recent-appointments`,
            keepUnusedDataFor: 600,
            providesTags: ["RecentAppointments"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //ErrorToast("Something Went Wrong!");
                    //do nothing
                    //console.log(err);
                }
            },
        }),
        createAppointment: builder.mutation({
            query: (data) => ({
                url: "/appointment/create-appointment",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Appointments", "RecentAppointments"],
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    SuccessToast("AppointmentList Create Success");
                }catch(err) {
                    //console.log(err)
                }
            }
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `/appointment/delete-appointment/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Appointments", "RecentAppointments"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast(" Success");
                    }
                }catch(err) {
                    //console.log(err);
                }
            }
        }),
        updateAppointment: builder.mutation({
            query: ({id, data}) => ({
                url: `/appointment/update-appointment/${id}`,
                method: "PUT",
                body:data
            }),
            invalidatesTags: ["Appointments", "RecentAppointments"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast(" Success");
                    }
                }catch(err) {
                    //console.log(err);
                }
            }
        }),
    }),
})


export const {useGetAppointmentsQuery, useGetRecentAppointmentsQuery, useCreateAppointmentMutation, useDeleteAppointmentMutation, useUpdateAppointmentMutation} = appointmentApi;