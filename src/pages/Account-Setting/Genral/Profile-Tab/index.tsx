import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../../layout/DefaultLayout';
import GeneralInfo from '../../../../components/Account-Setting/Genral/Profile-Tab';

const ProfileTab = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Account Setting" />
      <div className="flex flex-col gap-10">
        <GeneralInfo />
      </div>
    </DefaultLayout>
  );
};

export default ProfileTab;
