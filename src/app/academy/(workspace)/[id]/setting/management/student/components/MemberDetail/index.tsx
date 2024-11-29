'use client';

import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Textarea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';

function MemberDetail() {
  const [edit, setEdit] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>();

  return (
    <FramerScale>
      <BoxContainer className="ml-0 w-full items-center gap-10 py-10 lg:ml-10">
        <Flex rowColumn="center" className="gap-6">
          <Flex className="relative">
            <Avatar size="lg" />
            <StateLabel label="Ⓟ 4,000" variant="yellow" className="absolute bottom-[-10px]" />
          </Flex>
          <Flex rowColumn="center" className="gap-1">
            <Typography size="h5">안예원</Typography>
            <Typography size="h7" className="font-normal opacity-80">
              닉네임 • 크래빗 초등학교
            </Typography>
            <Typography size="h7" className="font-normal opacity-80">
              한줄 소개가 없습니다.
            </Typography>
          </Flex>
        </Flex>
        {edit ? (
          <Flex column="center" className="size-full justify-between gap-2">
            <Textarea errors={errors} id="content" label="추가 설명" register={register} className="h-full" variant="secondary" />
            <Flex className="justify-end">
              <Button type="button" className="w-fit px-2 py-1 text-sm" onClick={() => setEdit(true)}>
                수정하기
              </Button>
            </Flex>
          </Flex>
        ) : (
          <BoxContainer variant="border" className="size-full justify-between">
            <Flex column="start" className="gap-1">
              <Typography size="h5">추가 설명</Typography>
              <Typography size="h7" className="font-normal opacity-80">
                학생에 대한 설명이 없습니다.
              </Typography>
            </Flex>

            <Flex className="justify-end">
              <Button type="button" className="w-fit px-2 py-1 text-sm" onClick={() => setEdit(true)}>
                수정하기
              </Button>
            </Flex>
          </BoxContainer>
        )}
      </BoxContainer>
    </FramerScale>
  );
}
export default MemberDetail;
