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

function InvitationModal() {
  const invitationModal = useInvitationModal();
  const [activeTab, setActiveTab] = useState(0);

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

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    console.log({
      ...data,
      academyRole: activeTab === 0 ? 'STUDENT' : 'INSTRUCTOR',
    });
  };

  const bodyContent = (
    <>
      <Heading title="Crabit에 오신 것을 환영합니다." subTitle="학원 초대 코드를 통해 학원에 가입해주세요!" />
      <Tabs.TabList>
        <Tabs.Tab index={0} activeTab={activeTab} setActiveTab={setActiveTab}>
          학생으로 가입
        </Tabs.Tab>
        <Tabs.Tab index={1} activeTab={activeTab} setActiveTab={setActiveTab}>
          선생님으로 가입
        </Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel index={0} activeTab={activeTab}>
          <Flex column="start" className="gap-5">
            <Input id="joinCode" label="초대 코드" register={register} errors={errors} required />
            <Input id="nickname" label="닉네임" register={register} errors={errors} required />
            <TextArea id="introduction" label="소개" register={register} errors={errors} required />
            <Input id="school" label="학교" register={register} errors={errors} required />
          </Flex>
        </Tabs.TabPanel>
        <Tabs.TabPanel index={1} activeTab={activeTab}>
          <Flex column="start" className="gap-5">
            <Input id="joinCode" label="초대 코드" register={register} errors={errors} required />
            <Input id="nickname" label="닉네임" register={register} errors={errors} required />
            <TextArea id="introduction" label="소개" register={register} errors={errors} required />
            <Input id="school" label="학교" register={register} errors={errors} required />
          </Flex>
        </Tabs.TabPanel>
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
      disabled={false}
      isOpen={invitationModal.isOpen}
      title="학원 가입 신청"
      body={bodyContent}
    />
  );
}

export default InvitationModal;
