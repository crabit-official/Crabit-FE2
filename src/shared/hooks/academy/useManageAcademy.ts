import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getAcademyInfo,
  leaveAcademy,
  revokeInstructor,
  revokeStudent,
  updateAcademyInfo,
  updateInstructorIntroduction,
  updateStudentIntroduction,
} from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';
import type { UseMutationCustomOptions } from '@/shared/types/common';
import type { TGetAcademyInfoRequest } from '@/shared/types/manage';

function useUpdateAcademyInfo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateAcademyInfo,
    onSuccess: () => {
      toast.success('학원 정보 수정을 성공적으로 완료했습니다.');
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
      toast.success('학원 탈퇴를 성공적으로 완료했습니다.');
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
      toast.success('학생 소개글 수정을 성공적으로 완료했습니다.');
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
      toast.success('선생님 소개글 수정을 성공적으로 완료했습니다.');
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
      toast.success('선생님 탈퇴를 성공적으로 완료했습니다.');
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

function useManageAcademy() {
  const updateAcademyInfo = useUpdateAcademyInfo();
  const leaveAcademy = useLeaveAcademy();
  const updateStudentIntroduction = useUpdateStudentIntroduction();
  const revokeStudent = useRevokeStudent();
  const updateInstructorIntroduction = useUpdateInstructorIntroduction();
  const revokeInstructor = useRevokeInstructor();

  return { updateAcademyInfo, leaveAcademy, updateStudentIntroduction, revokeStudent, updateInstructorIntroduction, revokeInstructor, useGetAcademyInfo };
}

export default useManageAcademy;
