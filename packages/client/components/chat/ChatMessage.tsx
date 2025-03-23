import Image from "next/image";

const ChatMessage = () => {
  return (
    <div className="flex flex-col space-y-2 p-4">
      {/* Received Message */}
      <div className="flex items-end space-x-2 max-w-xs">
        <Image
          width={40}
          height={40}
          src="/default-profile.jpg" // TODO: Replace with dynamic source
          alt="Profile Picture"
          className="rounded-lg"
        />
        <div className="bg-gray-200 text-black p-3 rounded-lg max-w-xs">
          <strong>Username</strong>
          <p>Hello! How are you?</p>
          <p className="text-xs text-gray-600 text-right">10:30 AM</p>
        </div>
      </div>

      {/* Sent Message */}
      <div className="flex justify-end max-w-xs self-end">
        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
          <p>I'm doing great, thanks!</p>
          <p className="text-xs text-white text-right">10:32 AM</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
