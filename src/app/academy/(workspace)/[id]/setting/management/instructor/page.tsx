import ProfileCard from '@/shared/components/ProfileCard';

function InstructorManagementPage() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 pl-0 md:pl-10 lg:grid-cols-2 xl:grid-cols-3">
      <ProfileCard name="김현지" nickname="루피" description="고구마 아이스크림은 맛없어" />
      <ProfileCard name="김용민" nickname="무지개" />
    </div>
  );
}

export default InstructorManagementPage;
