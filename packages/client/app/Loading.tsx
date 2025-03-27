import LightBg from "@/components/SVG/LightBg";
import { Comment } from "react-loader-spinner";

const Loading = () => {
  return (
    <main className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <Comment
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
      <LightBg className="absolute z-[-10] min-h-screen" />
    </main>
  );
};

export default Loading;
