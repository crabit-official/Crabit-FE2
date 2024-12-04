import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  editAcademyMemberProfile,
  getAcademyInfo,
  getAcademyInstructorDetail,
  getAcademyMemberProfile,
  leaveAcademy,
  revokeInstructor,
  revokeStudent,
  updateAcademyInfo,
  updateInstructorIntroduction,
  updateStudentIntroduction,
} from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';
import type { TAcademyInstructorDetailRequest, TAcademyMemberProfileRequest } from '@/shared/types/acadmy';
import type { UseMutationCustomOptions } from '@/shared/types/common';
import type { TGetAcademyInfoRequest } from '@/shared/types/manage';

function useUpdateAcademyInfo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateAcademyInfo,
    onSuccess: () => {
      toast.success('기관 정보 수정을 성공적으로 완료했습니다.');
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
    ...mutationOptions,
  });
}

function useLeaveAcademy(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: leaveAcademy,
    onSuccess: () => {
      toast.success('기관 탈퇴를 성공적으로 완료했습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
}

function useUpdateStudentIntroduction(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentIntroduction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_STUDENT_DETAIL_LIST] });
      toast.success('학생 설명 수정을 성공적으로 완료했습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
}

function useRevokeStudent(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeStudent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_STUDENT_DETAIL_LIST] });
      toast.success('학생 탈퇴를 성공적으로 완료했습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
}

function useUpdateInstructorIntroduction(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateInstructorIntroduction,
    onSuccess: () => {
      toast.success('관리자 설명 수정을 성공적으로 완료했습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
}

function useRevokeInstructor(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: revokeInstructor,
    onSuccess: () => {
      toast.success('관리자 탈퇴를 성공적으로 완료했습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
}

function useGetAcademyInfo({ academyId }: TGetAcademyInfoRequest) {
  return useQuery({
    queryFn: () => getAcademyInfo({ academyId }),
    queryKey: [queryKeys.ACADEMY_INFO, academyId],
  });
}

function useGetAcademyMemberProfile({ academyId }: TAcademyMemberProfileRequest) {
  return useQuery({
    queryFn: () => getAcademyMemberProfile({ academyId }),
    queryKey: [queryKeys.ACADEMY_MEMBER_PROFILE, academyId],
  });
}

function useEditAcademyMemberProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editAcademyMemberProfile,
    onSuccess: () => {
      toast.success('프로필 수정에 성공하였습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    ...mutationOptions,
  });
}
function useGetAcademyInstructorDetailProfile({ academyId, academyMemberId }: TAcademyInstructorDetailRequest) {
  return useQuery({
    queryFn: () => getAcademyInstructorDetail({ academyId, academyMemberId }),
    queryKey: [queryKeys.ACADEMY_INSTRUCTOR_PROFILE, academyMemberId],
  });
}

function useManageAcademy() {
  const updateAcademyInfo = useUpdateAcademyInfo();
  const leaveAcademy = useLeaveAcademy();
  const updateStudentIntroduction = useUpdateStudentIntroduction();
  const revokeStudent = useRevokeStudent();
  const updateInstructorIntroduction = useUpdateInstructorIntroduction();
  const revokeInstructor = useRevokeInstructor();
  const editAcademyMemberProfile = useEditAcademyMemberProfile();

  return {
    updateAcademyInfo,
    leaveAcademy,
    updateStudentIntroduction,
    revokeStudent,
    updateInstructorIntroduction,
    revokeInstructor,
    useGetAcademyInfo,
    useGetAcademyMemberProfile,
    editAcademyMemberProfile,
    useGetAcademyInstructorDetailProfile,
  };
}

export default useManageAcademy;
