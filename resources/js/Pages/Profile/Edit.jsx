import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ResponsiveSidebar from '@/Components/ResponsiveSidebar'; 

export default function Edit({ mustVerifyEmail, status, user, auth, tasks = [] }) {
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profilePic) return;

    const formData = new FormData();
    formData.append('profile_pic', profilePic);

    Inertia.post(route('profile.update.pic'), formData, {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">

        <ResponsiveSidebar auth={auth} />

        <main className="flex-1 py-8 px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse lg:flex-row gap-8">

            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                  className="max-w-xl"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
                <UpdatePasswordForm className="max-w-xl" />
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
                <DeleteUserForm className="max-w-xl" />
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col items-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow mb-8 lg:mb-0">
              <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
              
              <img
                src={profilePic 
                      ? URL.createObjectURL(profilePic) 
                      : user.profile_pic_url || '/storage/avatar/avatar.jpg'}
                alt="Profile"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 mb-4"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="mb-4 text-sm"
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                Save
              </button>

            
              <div className="mt-6 w-full">
                <div className="flex flex-wrap justify-center gap-3">
                  {tasks.map((task) => task.streak > 0 && (
                    <div key={task.id} className="relative">
                      <img
                        src="/images/fire.png"
                        alt="Streak"
                        className="w-10 h-10 sm:w-12 sm:h-12"
                      />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                        {task.streak}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
