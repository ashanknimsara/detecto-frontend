import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import GenaralNav from '../../../components/Account-Setting/Genral';

const ManageAccount = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Account Setting" />
      <div className="flex flex-col gap-10">
        <GenaralNav />
      </div>
    </DefaultLayout>
  );
};

export default ManageAccount;
