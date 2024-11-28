import ProfileCard from '@/shared/components/ProfileCard';

function StudentManagementPage() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 pl-0 md:pl-10 lg:grid-cols-2 xl:grid-cols-3">
      <ProfileCard name="안예원" nickname="면 싫어" school="대진고등학교" description="예원이는 ISTP" point={1000} />
      <ProfileCard name="안예원" nickname="흥흥 " school="대진고등학교" point={1000} />
    </div>
  );
}
export default StudentManagementPage;
