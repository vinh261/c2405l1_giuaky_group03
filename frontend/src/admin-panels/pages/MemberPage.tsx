import React, { useCallback } from "react";
import MemberList from "../components/ui/add-user/MemberList";
import MemberData from "../components/data/add-user/MemberData";
import ViewProfile from "../components/ui/add-user/ViewProfile";
import { useToDo } from "../../hooks/useToDo";
import type { FormProps } from "../../types/models.types";

const MemberPage = () => {
    const {
        openView,
        setOpenView,
        memberView,
        setMemberView,
    } = useToDo();

    const handleViewMember = useCallback(
        (member: FormProps) => {
            setMemberView(member);
            setOpenView(true);
        },
        [setMemberView, setOpenView]
    );

    const closeViewModal = useCallback(() => {
        setOpenView(false);
        setMemberView(null); // Reset khi đóng
    }, [setOpenView, setMemberView]);

    return (
        <React.Fragment>
            <MemberData />
            <MemberList handleViewMember={handleViewMember} />
            <ViewProfile
                isOpen={openView}
                onClose={closeViewModal}
                memberData={memberView}
            />
        </React.Fragment>
    );
};

export default MemberPage;

