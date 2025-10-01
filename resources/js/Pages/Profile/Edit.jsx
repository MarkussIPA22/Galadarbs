import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Sidebar from '@/Components/Sidebar';

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
        <Sidebar auth={auth} />

        <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Left forms */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                  className="max-w-xl"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <UpdatePasswordForm className="max-w-xl" />
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <DeleteUserForm className="max-w-xl" />
              </div>
            </div>

            {/* Right sidebar */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
              
              <img
                src={profilePic 
                      ? URL.createObjectURL(profilePic) 
                      : user.profile_pic_url || '/storage/avatar/avatar.jpg'}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 mb-4"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="mb-4 text-sm"
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save
              </button>

              {/* Streaks section */}
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold mb-2 text-center">Task Streaks 🔥</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {tasks.map((task) => task.streak > 0 && (
                    <div key={task.id} className="relative">
                      <img
                        src="/images/fire.png" // your fire icon
                        alt="Streak"
                        className="w-12 h-12"
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
