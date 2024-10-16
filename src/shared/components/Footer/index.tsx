import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function Footer() {
  return (
    <footer className="h-52 bg-black p-16 py-10 text-white">
      <Flex column="between" className="h-full">
        <Typography size="h1" className="font-extrabold text-white">
          Contact Us
        </Typography>
        <p className="text-xs text-neutral-500">@2024 CRABIT. All rights reserved.</p>
      </Flex>
    </footer>
  );
}

export default Footer;
