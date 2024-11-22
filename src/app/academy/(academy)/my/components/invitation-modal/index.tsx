'use client';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Tabs from './components/Tab';

import useInvitationModal from '@/app/academy/(academy)/my/hooks/use-invitation-modal';
import Flex from '@/shared/components/Flex';
import Heading from '@/shared/components/Heading';
import Input from '@/shared/components/Input';
import Modal from '@/shared/components/Modal';
import TextArea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import useEnrollInvitation from '@/shared/hooks/invitation/useEnrollInvitation';

function InvitationModal() {
  const invitationModal = useInvitationModal();
  const [activeTab, setActiveTab] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  console.log(activeTab);
  const { mutateAsync } = useEnrollInvitation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      joinCode: '',
      academyRole: '',
      nickname: '',
      introduction: '',
      school: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);

    await mutateAsync(
      {
        joinCode: data.joinCode,
        academyRole: activeTab === 0 ? 'STUDENT' : 'INSTRUCTOR',
        nickname: data.nickname,
        introduction: data.introduction,
        school: data.school,
      },
      {
        onSuccess: () => {
          console.log('성공');
        },
        onError: (error) => {
          console.log(error);
          console.error('Error');
        },
      },
    );

    setIsLoading(false);
  };

  const bodyContent = (
    <>
      <Heading title="크래빗에 오신 것을 환영합니다." subTitle="학원 초대 코드를 통해 학원에 가입해주세요!" />
      <Tabs.TabList>
        <Tabs.Tab index={0} activeTab={activeTab} setActiveTab={setActiveTab}>
          학생으로 가입
        </Tabs.Tab>
        <Tabs.Tab index={1} activeTab={activeTab} setActiveTab={setActiveTab}>
          선생님으로 가입
        </Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        {activeTab === 0 && (
          <Tabs.TabPanel index={0} activeTab={activeTab}>
            <Flex column="start" className="gap-5">
              <Input disabled={isLoading} id="joinCode" label="초대 코드" register={register} errors={errors} required />
              <Input disabled={isLoading} id="nickname" label="닉네임" register={register} errors={errors} required />
              <TextArea disabled={isLoading} id="introduction" label="소개" register={register} errors={errors} required />
              <Input disabled={isLoading} id="school" label="학교" register={register} errors={errors} required />
            </Flex>
          </Tabs.TabPanel>
        )}
        {activeTab === 1 && (
          <Tabs.TabPanel index={1} activeTab={activeTab}>
            <Flex column="start" className="gap-5">
              <Input disabled={isLoading} id="joinCode" label="초대 코드" register={register} errors={errors} required />
              <Input disabled={isLoading} id="nickname" label="닉네임" register={register} errors={errors} required />
              <TextArea disabled={isLoading} id="introduction" label="소개" register={register} errors={errors} required />
              <Input disabled={isLoading} id="school" label="학교" register={register} errors={errors} required />
            </Flex>
          </Tabs.TabPanel>
        )}
      </Tabs.TabPanels>
    </>
  );

  return (
    <Modal
      onClose={invitationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={
        <Typography size="h5" color="main-white">
          학원 가입 신청하기
        </Typography>
      }
      disabled={isLoading}
      isOpen={invitationModal.isOpen}
      title="학원 가입 신청"
      body={bodyContent}
    />
  );
}

export default InvitationModal;
