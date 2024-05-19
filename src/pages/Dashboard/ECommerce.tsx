import DefaultLayout from '../../../src/layout/DefaultLayout';
import Breadcrumb from '../../../src/components/Breadcrumbs/Breadcrumb';
import TableThree from '../../components/Tables/TableThree';

function Cases() {
  return (
    <DefaultLayout >
        <Breadcrumb pageName="Cases" />
        <TableThree/>
    </DefaultLayout>
  )
}

export default Cases

