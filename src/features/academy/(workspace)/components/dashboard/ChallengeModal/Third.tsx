// import { useState } from 'react';
// import { type FieldValues, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { toast } from 'sonner';
//
// import type { IChallengeValue } from '@/features/academy/(workspace)/components/dashboard/ChallengeModal/index';
// import Students from '@/features/academy/(workspace)/components/dashboard/Students';
// import useGetStudents from '@/features/academy/(workspace)/hooks/challenges/use-get-students';
// import Flex from '@/shared/components/Flex';
// import SelectDropdown from '@/shared/components/SelectDropdown';
// import Spacing from '@/shared/components/Spacing/spacing';
// import Typography from '@/shared/components/Typography';
// import { METHOD_CATEGORIES } from '@/shared/constants/challenge-cataegrories';
// import { challengeSchema } from '@/shared/utils/schema';
//
// type InfoValues = Pick<IChallengeValue, 'challengeParticipationMethod' | 'studentIdList'>;
//
// interface IThirdProps {
//   accessToken: string;
//   id: string;
//   onBack: () => void;
//   onNext: (values: InfoValues) => void;
// }
// function Third({ onNext, id, accessToken, onBack }: IThirdProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<FieldValues>({
//     resolver: zodResolver(challengeSchema),
//     defaultValues: {
//       challengeParticipationMethod: 'ASSIGNED',
//       studentIdList: [],
//     },
//   });
//   const [selectedStudentIdList, setSelectedStudentIdList] = useState<number[]>([]);
//   const watchCategory = watch('challengeCategory');
//   const { data: students } = useGetStudents(id, accessToken, 4);
//
//
//
//   const onSubmit = (data: FieldValues) => {
//     if (data.challengeParticipationMethod === 'ASSIGNED' && selectedStudentIdList.length === 0) {
//       toast.error("챌린지 참여방식이 '배정'인 경우 최소 1명이상의 학생을 선택해야합니다.");
//       return;
//     }
//     onNext({
//       challengeParticipationMethod: data.challengeParticipationMethod,
//       studentIdList: data.challengeParticipationMethod === 'ASSIGNED' ? selectedStudentIdList : [],
//     });
//   };
//
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex size-full min-h-96 flex-col items-center justify-between gap-2">
//       <Flex column="center" className="w-full gap-8">
//         <Typography size="h4" className="text-center">
//           챌린지 정보 입력하기
//         </Typography>
//         <SelectDropdown id="challengeCategory" label="챌린지 참여 방식" register={register} errors={errors} options={METHOD_CATEGORIES} />
//
//         {/* {watchCategory === 'ASSIGNED' && ( */}
//         {/*  <Flex className="w-full flex-wrap gap-2"> */}
//         {/*    {students?.pages.map((page) => { */}
//         {/*      page.result.studentList.map((student) => <>{student.studentId}</>); */}
//         {/*    })} */}
//         {/*  </Flex> */}
//         {/* )} */}
//
//         <Spacing direction="vertical" size={20} />
//
//         <Flex className="w-full gap-2">
//           <button type="button" className="w-full rounded-xl bg-neutral-100 p-4 text-neutral-400 hover:bg-gray-300" onClick={onBack}>
//             이전
//           </button>
//           <button type="submit" className="w-full rounded-xl bg-main-pink p-4 text-white hover:opacity-90">
//             챌린지 생성
//           </button>
//         </Flex>
//       </Flex>
//     </form>
//   );
// }
//
// export default Third;
