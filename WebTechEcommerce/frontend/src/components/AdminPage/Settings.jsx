import BreadCrumb from "@/components/Breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const breadcrumbItems = [{ title: "Settings", link: "/admin/settings" }];
  return (
    <div>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Settings`} description="Manage settings" />
        </div>
        <Separator />
        {/* {data && <MemberTable data={data} columns={memberColumn} />} */}
      </div>
    </div>
  );
};

export default Settings;
