import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../../layout/DefaultLayout';
import ChangePassword from '../../../../components/Account-Setting/Genral/change-password';

const ChangePasswordTab = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Account Setting" />
      <div className="flex flex-col gap-10">
        <ChangePassword />
      </div>
    </DefaultLayout>
  );
};

export default ChangePasswordTab;
