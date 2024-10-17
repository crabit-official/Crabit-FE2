function AcademyDashBoardPage() {
  return (
    <section className="p-14">
      <div className="space-y-4 rounded-3xl bg-white p-4 shadow-transparent transition-all duration-200 hover:shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="이미지 설명"
          className="size-full shrink-0 bg-[#131315] object-contain"
          src="https://plus.unsplash.com/premium_photo-1681396937086-8a28edd8d257?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3VpdGFyfGVufDB8fDB8fHww"
        />
        <div className="max-h-none w-full text-[15px] leading-6">
          <p className="break-all focus:outline-none">프로젝트에 관한 설명입니다.</p>
        </div>
      </div>
    </section>
  );
}

export default AcademyDashBoardPage;
