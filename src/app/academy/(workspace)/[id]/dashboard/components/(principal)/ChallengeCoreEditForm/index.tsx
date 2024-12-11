'use client';

import React, { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFile, FaRegEdit } from 'react-icons/fa';
import { FaFileImport } from 'react-icons/fa6';
import { IoMdPhotos } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import type { z } from 'zod';

import Students from '@/features/academy/(workspace)/components/dashboard/Students';
import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Input from '@/shared/components/Input';
import SelectDropdown from '@/shared/components/SelectDropdown';
import Textarea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_CATEGORIES, METHOD_CATEGORIES, VISIBILITY_CATEGORIES } from '@/shared/constants/challenge-cataegrories';
import { queryKeys } from '@/shared/constants/query-keys';
import type { CHALLENGE_CATEGORY, CHALLENGE_SOURCE_TYPE, MARKET_VISIBILITY_CATEGORIES } from '@/shared/enums/challenge';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useGetInfiniteAcademyMemberDetailList from '@/shared/hooks/academy/useGetInfiniteAcademyStudentList';
import useEditChallenge from '@/shared/hooks/challenge/useEditChallenge';
import useGetPresignedUrl from '@/shared/hooks/images/use-get-presigned-url';
import type { TChallengeEditRequest } from '@/shared/types/acadmy';
import { S3_FOLDER_NAME } from '@/shared/types/image';
import { challengeEditSchema } from '@/shared/utils/schema';

type FormValues = z.infer<typeof challengeEditSchema>;

interface IEditProps {
  challengeCategory: CHALLENGE_CATEGORY;
  challengeMarketVisibility: MARKET_VISIBILITY_CATEGORIES;
  challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
  challengeSource: CHALLENGE_SOURCE_TYPE;
  content: string;
  description: string;
  fileUrl: string;
  points: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  thumbnailImageUrl: string;
  title: string;
  totalDays: number;
}

function ChallengeCoreEditForm({
  points,
  title,
  totalDays,
  content,
  description,
  challengeParticipationMethod,
  setIsEdit,
  challengeSource,
  challengeCategory,
  thumbnailImageUrl,
  fileUrl,
  challengeMarketVisibility,
}: IEditProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      points: points || 0,
      totalDays: totalDays || 0,
      description: description || '',
      challengeParticipationMethod: challengeParticipationMethod || CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
      title: title || '',
      content: content || '',
      challengeCategory: challengeCategory || 'ETC',
      challengeMarketVisibility: challengeMarketVisibility || 'PROTECTED',
      thumbnailImageUrl: thumbnailImageUrl || null,
      fileUrl: fileUrl || null,
    },
    resolver: zodResolver(challengeEditSchema),
  });
  const queryClient = useQueryClient();
  const params = useParams();
  const { mutate } = useEditChallenge();
  const { data: studentData, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteAcademyMemberDetailList(10, Number(params.id));
  const { handleChangeFile, file, handleImageUpload, handleRemove } = useImage();
  const { filePreview: imagePreview, handleChangeFile: imageChange, file: image, handleRemove: removeImage } = useImage();

  const { data: fileKeyname, isSuccess } = useGetPresignedUrl({
    fileName: file?.name as string,
    s3Folder: S3_FOLDER_NAME.CHALLENGE_CORE_FILE,
  });
  const { data: imageKeyname, isSuccess: imageSuccess } = useGetPresignedUrl({
    fileName: image?.name as string,
    s3Folder: S3_FOLDER_NAME.CHALLENGE_CORE_THUMBNAIL_IMAGE,
  });

  const [thumbnail, setThumbnail] = useState<string | null>(thumbnailImageUrl);
  const [attachedFile, setAttachedFile] = useState<string | null>(fileUrl);
  const [selectedStudentIdList, setSelectedStudentIdList] = useState<number[]>([]);
  const watchCategory = watch('challengeParticipationMethod');

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        void fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleEdit = ({ data, imageKeyName, fileKeyName }: { data: FormValues; fileKeyName?: string; imageKeyName?: string }) => {
    const academyId = Number(params.id);
    const releasedChallengeId = Number(params.challengeId);

    const challengeData: TChallengeEditRequest = {
      academyId,
      releasedChallengeId,
      challengeParticipationMethod: data.challengeParticipationMethod as CHALLENGE_PARTICIPATION_METHODS,
      totalDays: data.totalDays || 0,
      studentIdList: selectedStudentIdList.length ? selectedStudentIdList : [],
      points: data.points || 0,
      description: data.description || '',
      title: data.title,
      content: data.content,
      challengeSource,
      thumbnailImageUrl: imageKeyName ?? data.thumbnailImageUrl,
      fileUrl: fileKeyName ?? data.fileUrl,
      challengeCategory: data.challengeCategory as CHALLENGE_CATEGORY,
      challengeMarketVisibility: data.challengeMarketVisibility as MARKET_VISIBILITY_CATEGORIES,
    };

    if (data.challengeParticipationMethod === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED && !selectedStudentIdList.length) {
      toast.error('배정형의 경우 학생을 선택해주세요');
      return;
    }

    mutate(challengeData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.CHALLENGE_DETAIL, academyId, releasedChallengeId],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.CHALLENGE_STUDENT_PROGRESS_LIST, { academyId }, { releasedChallengeId }],
        });
      },
      onSettled: () => {
        setIsEdit((prev) => !prev);
      },
    });
  };

  const onSubmit = async (data: FormValues) => {
    let fileKeyName;
    let imageKeyName;

    if (file && isSuccess) {
      const fileUploaded = await handleImageUpload(fileKeyname.result.url, file);
      if (fileUploaded) fileKeyName = fileKeyname.result.keyName;
    }

    if (image && imageSuccess) {
      const imageUploaded = await handleImageUpload(imageKeyname.result.url, image);
      if (imageUploaded) imageKeyName = imageKeyname.result.keyName;
    }

    handleEdit({ data, fileKeyName, imageKeyName });
  };

  const handleRemoveImage = () => {
    if (image) removeImage();
    else {
      setThumbnail(null);
      setValue('thumbnailImageUrl', null);
    }
  };

  const handleRemoveFile = () => {
    if (file) handleRemove();
    else {
      setAttachedFile(null);
      setValue('fileUrl', null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col justify-start gap-5">
      <Typography size="h1" className="flex items-center gap-2 px-1">
        <FaRegEdit />
        {title} 수정
      </Typography>
      <Flex column="start" className="w-full gap-4">
        <BoxContainer>
          <Flex column="start" className="gap-1">
            <Typography size="h3" className="opacity-80">
              챌린지 이미지
            </Typography>
            <Flex as="figure" row="start" className="mt-4">
              <label
                htmlFor="thumbnailImageUrl"
                className="flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-neutral-100"
              >
                {imagePreview ? (
                  <Image src={imagePreview} width={200} height={200} className="h-52 w-full overflow-hidden rounded-xl object-cover" alt="img" />
                ) : thumbnail ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${thumbnail}`}
                    width={200}
                    height={200}
                    className="h-52 w-full overflow-hidden rounded-xl object-cover"
                    alt="img"
                  />
                ) : (
                  <IoMdPhotos size={30} />
                )}
              </label>
              <input type="file" id="thumbnailImageUrl" {...register('thumbnailImageUrl')} onChange={imageChange} className="hidden" />
            </Flex>
            <div className="flex w-full justify-end px-1">
              <button type="button" className="w-fit text-xs text-gray-500 hover:text-main-deep-pink" onClick={handleRemoveImage}>
                챌린지 썸네일 삭제
              </button>
            </div>
          </Flex>
        </BoxContainer>
        <BoxContainer>
          <Flex column="start" className="gap-1">
            <Typography size="h3" className="opacity-80">
              첨부파일
            </Typography>
            <Flex as="figure" column="start">
              <label htmlFor="fileUrl" className="flex w-full cursor-pointer items-center justify-start gap-2 py-2 font-medium opacity-80">
                <BoxContainer variant="border" className="relative w-full flex-row items-center gap-2">
                  {file ? (
                    file.name
                  ) : attachedFile ? (
                    <Flex row="start">
                      <FaFile className="mr-2" />
                      <Link target="_blank" href={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${attachedFile}`} download className="text-blue-500 underline">
                        {attachedFile.split('_').slice(1).join('_')}
                      </Link>
                    </Flex>
                  ) : (
                    <>
                      <FaFileImport />
                      <Typography size="h5">첨부파일 업로드</Typography>
                    </>
                  )}
                </BoxContainer>
              </label>
              <button type="button" className="flex justify-end text-xs text-gray-600 hover:text-main-deep-pink" onClick={handleRemoveFile}>
                첨부파일 삭제
              </button>
              <input type="file" id="fileUrl" {...register('fileUrl')} onChange={handleChangeFile} className="hidden" />
            </Flex>
          </Flex>
        </BoxContainer>
        <BoxContainer className="group justify-between transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
          <Flex column="start" className="gap-1">
            <Typography size="h3">제목</Typography>
          </Flex>
          <Input id="title" type="text" label="제목" register={register} errors={errors} required />
        </BoxContainer>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <BoxContainer className="group justify-between transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
            <Flex column="start" className="gap-1">
              <Typography size="h3">챌린지 종류</Typography>
            </Flex>
            <SelectDropdown id="challengeCategory" label="챌린지 종류" register={register} errors={errors} options={CHALLENGE_CATEGORIES} />
          </BoxContainer>
          <BoxContainer className="group justify-between transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
            <Flex column="start" className="gap-1">
              <Typography size="h3">챌린지 마켓 업로드 여부</Typography>
            </Flex>
            <SelectDropdown
              id="challengeMarketVisibility"
              label="챌린지 마켓 업로드 여부"
              register={register}
              errors={errors}
              options={VISIBILITY_CATEGORIES}
            />
          </BoxContainer>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <BoxContainer className="group justify-between transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
            <Flex column="start" className="gap-1">
              <Typography size="h3">포인트</Typography>
            </Flex>
            <Input id="points" type="number" label="포인트" register={register} errors={errors} required valueAsNumber />
          </BoxContainer>
          <BoxContainer className="group justify-between transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
            <Flex column="start" className="gap-1">
              <Typography size="h3" className="opacity-80">
                총 챌린지 기간
              </Typography>
              <Typography size="h5" as="p" className="text-xs opacity-60">
                tip ) 챌린지 진행 기간은 최소 3일에서 최대 31일까지 설정할 수 있습니다.
              </Typography>
            </Flex>
            <Input id="totalDays" label="챌린지 기간" type="number" register={register} errors={errors} required valueAsNumber />
          </BoxContainer>
        </div>
        <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
          <Flex column="start" className="gap-1 border-b border-solid border-b-gray-100 pb-4">
            <Typography size="h3" className="opacity-80">
              원본 챌린지 설명
            </Typography>
            <Textarea errors={errors} id="content" label="원본 챌린지 설명" register={register} className="my-2" />
          </Flex>
          <Flex column="start" className="gap-1">
            <Typography size="h3" className="opacity-80">
              챌린지 추가 설명
            </Typography>
            <Typography size="h5" as="p" className="text-xs opacity-60">
              우리 기관에 맞는 설명을 추가하고싶은 경우 작성해주세요
            </Typography>
          </Flex>
          <Textarea errors={errors} id="description" label="챌린지 추가 설명" register={register} />
        </BoxContainer>

        <BoxContainer className="group transition-colors duration-300 focus-within:border-main-deep-pink focus-within:shadow-hover-pink">
          <Flex column="start" className="gap-1">
            <Typography size="h3">챌린지 참여 방식</Typography>
            <Typography size="h5" as="p" className="text-xs opacity-60">
              tip ) 배정형의 경우 참여 학생을 선택합니다.
            </Typography>
          </Flex>
          <Flex column="center" className="w-full gap-4">
            <SelectDropdown id="challengeParticipationMethod" label="챌린지 참여 방식" register={register} errors={errors} options={METHOD_CATEGORIES} />
            {watchCategory === CHALLENGE_PARTICIPATION_METHODS.ASSIGNED && (
              <>
                <Typography size="h5" className="mt-2 border-t border-solid border-gray-100 pt-4 text-sm font-normal opacity-80">
                  챌린지에 참여할 학생을 선택해주세요.
                </Typography>
                <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto">
                  {studentData?.pages.map((page) =>
                    page.result.studentList.map((student) => (
                      <Students
                        key={student.academyMemberId}
                        {...student}
                        selectedStudentIdList={selectedStudentIdList}
                        setSelectedStudentIdList={setSelectedStudentIdList}
                      />
                    )),
                  )}
                  <div ref={ref} className="h-5" />
                </div>
              </>
            )}
          </Flex>
        </BoxContainer>
      </Flex>
      <Button type="submit">수정하기</Button>
    </form>
  );
}
export default ChallengeCoreEditForm;
