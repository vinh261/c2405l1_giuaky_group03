import React, { useCallback } from "react";
import MemberList from "../components/ui/add-user/MemberList";
import ViewProfile from "../components/ui/add-user/ViewProfile";
import MemberData from "../components/ui/add-user/MemberData";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { FormProps } from "@/features/auth/types/auth.types";

const MemberPage = () => {
    const {
        openView,
        setOpenView,
        memberView,
        setMemberView,
    } = useAuth();

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

