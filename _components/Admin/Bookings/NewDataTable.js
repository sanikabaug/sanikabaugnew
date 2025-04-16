import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import Image from "next/image";


const columns = [
  { name: "ID", uid: "booking_id", sortable: true },
  { name: "NAME", uid: "username", sortable: true },
  { name: "Number", uid: "phone", sortable: true },
  { name: "NO. OF ADULTS", uid: "adults_count", sortable: true },
  { name: "NO. OF ROOMS", uid: "rooms_count", sortable: true },
  { name: "NO. OF CHILDS", uid: "childrens_count", sortable: true },
  { name: "PAYMENT ID", uid: "payment_id", sortable: true },
  { name: "ORDER ID", uid: "order_id" },
  { name: "INVOICE ID", uid: "invoice_id" },
  { name: "CHECK-IN", uid: "checkin_dateF" },
  { name: "CHECK-OUT", uid: "checkout_dateF" },
  { name: "EMAIL", uid: "email" },
  { name: "BOOKING DATE", uid: "booking_date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
  { name: "Inprocess", uid: "inprocess" },
];

const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);


const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);

const statusColorMap = {
  paid: "success",
  unpaid: "danger",
  inprocess: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["booking_id",
  "username",
  "phone",
  "booking_date",
  "checkin_dateF",
  "checkout_dateF",
  "email", "booking_date", "status", "actions"];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function NewDataTable({ users }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


  const [bookingID, setBookingID] = React.useState("");
  const [selectedBooking, setSelectedBooking] = React.useState({});
  const [imagesCloud, setImagesCloud] = React.useState([]);


  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "booking_id",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.payment_id.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2 z-50">
            <button onClick={(e) => handleInfo(user.booking_id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            </button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={10}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const handleInfo = (id) => {
    setBookingID(id)
    const initialFxn = async (id) => {
      try {
        const response = await fetch(`/api/userApi/booking_details?bookingId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log("Data::::::::>", result)
        setSelectedBooking(result?.databyid)



        let abcc = async (result) => {
          let arr = [];

          // Use Promise.all to wait for all fetches to complete
          await Promise.all(
            result.map(async (item) => {
              const responseee = await fetch(`/api/upload?folder=${encodeURIComponent(item.name + "-" + item.id)}`, {
                method: 'GET',
              });
              const dataaa = await responseee.json();
              if (dataaa.success) {
                arr.push({ id: item.id, val: dataaa.results });
              } else {
                console.error('Fetch failed:', dataaa.error);
              }
            })
          );

          console.log('Array1234:', arr); // Now this should log the complete array

          setImagesCloud(arr); // Update the state with the complete array
        };

        console.log("result?.databyid?.roomDet: ", result?.databyid?.roomDet)

        abcc(result?.databyid?.roomDet);

      } catch (error) {

      }
    }
    initialFxn(id)

    onOpen()
  }

  return (
    <><Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.booking_id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" className='h-auto overflow-y-scroll'>
        <ModalContent>
          {(onClose) => (
            <div className="">
              <ModalHeader className="">Rooms Details</ModalHeader>
              <ModalBody>
                {console.log("ABC:::::::::>", selectedBooking, imagesCloud)}
                <div>
                  <div className="grid gap-2">
                    <div className="inline-flex">
                      <p className="font-bold">Id:</p>&nbsp;<p>{selectedBooking.booking_id}</p>
                    </div>
                    <div className="inline-flex">
                      <p className="font-bold">Payment Id:</p>&nbsp;<p>{selectedBooking.payment_id}</p>
                    </div>
                    <div className="inline-flex">
                      <p className="font-bold">Order Id:</p>&nbsp;<p>{selectedBooking.order_id}</p>
                    </div>
                    <div className="inline-flex">
                      <p className="font-bold">Check-in date:</p>&nbsp;<p>{selectedBooking.checkin_dateF}</p>
                    </div>
                    <div className="inline-flex">
                      <p className="font-bold">Check-out date:</p>&nbsp;<p>{selectedBooking.checkout_dateF}</p>
                    </div>
                    <div className="inline-flex">
                      <p className="font-bold">Booking date:</p>&nbsp;<p>{selectedBooking.booking_date}</p>
                    </div>
                  </div>


                  <div className="mb-4 mt-4">
                    {console.log("Image url::::>", imagesCloud)}
                    {selectedBooking?.roomDet?.map((item) => {
                      
                      return (
                        <div key={item.id} className="mb-4 flex gap-4">
                          {item.roomimage && (
                            <Image
                              src={item.roomimage}
                              alt={`${item.name} Room`}
                              className="w-1/4 h-32 object-cover rounded-lg"
                              width={500}
                              height={500}
                            />
                          )}
                          <div>
                            <p className="text-lg font-semibold">{item.name}</p>
                            <p>{item.adultCount} Adult</p>
                            <p>{item.childCount} Children</p>
                            <p>Room 1</p>
                            <p>Base Price: ₹ {item.amount}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid gap-2">

                    <div className="inline-flex">
                      <p className="font-bold">Final Price:</p>&nbsp;<p>{selectedBooking?.price}</p>
                    </div>

                    <div className="inline-flex">
                      <p className="font-bold">Status:</p>&nbsp;<p>{selectedBooking?.pflag0 === 1 ? "Paid" : "Payment Pending"}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal></>

  );
}
