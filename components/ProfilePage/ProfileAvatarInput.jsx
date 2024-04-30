import { Avatar } from "@material-tailwind/react";
// import { PencilIcon } from "@heroicons/react/24/solid";

function ProfileAvatarInput({ avatar, nameInitial, onChange }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative inline-block">
        {avatar ? (
          <Avatar src={avatar} className="w-28 h-28" />
        ) : (
          <div className="flex items-center justify-center text-xl font-semibold border-2 rounded-full w-28 h-28 border-blue-gray-800">
            <span>{nameInitial}</span>
          </div>
        )}
        <label
          className="absolute right-0 bg-white rounded-full top-2"
          htmlFor="avatar"
        >
          <input
            onChange={({ target }) => {
              const { files } = target;
              if (files) onChange && onChange(files[0]);
            }}
            type="file"
            id="avatar"
            hidden
            accept="image/*"
          />
          {/* <PencilIcon className="w-6 h-6 p-1 cursor-pointer" /> */}
        </label>
      </div>
    </div>
  );
}

export default ProfileAvatarInput;
