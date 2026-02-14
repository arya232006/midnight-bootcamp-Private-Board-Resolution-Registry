
import { DerivedState } from "../api/common-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContractControllerInterface } from "../api/contractController";
import { Observable } from "rxjs";
import { useWallet } from "../../wallet-widget/hooks/useWallet";
import { ContractDeployment, ContractFollow } from "../contexts";
import { useDeployedContracts } from "./use-deployment";
import { useProviders } from "./use-providers";

export const useContractSubscription = () => {
  const { status } = useWallet();
  const providers = useProviders();
  const deploy = useDeployedContracts();

  const [counterDeploymentObservable, setCounterDeploymentObservable] =
    useState<Observable<ContractDeployment> | undefined>(undefined);

  const [contractDeployment, setContractDeployment] =
    useState<ContractDeployment>();
  const [deployedContractAPI, setDeployedContractAPI] =
    useState<ContractControllerInterface>();
  const [derivedState, setDerivedState] = useState<DerivedState>();

  // Track whether a deploy is in progress or completed to prevent
  // onJoin from overwriting the deploy observable.
  const deployingRef = useRef(false);

  const onDeploy = async (): Promise<ContractFollow> => {
    deployingRef.current = true;
    const contractFollow = await deploy.deployContract();
    setCounterDeploymentObservable(contractFollow.observable);
    return contractFollow;
  }

  const onJoin = useCallback(async (): Promise<void> => {
    if (deployingRef.current) return;
    setCounterDeploymentObservable(deploy.joinContract().observable);
  }, [deploy, setCounterDeploymentObservable]);

  useEffect(() => {
    if (status?.status === "connected" && providers && !deployingRef.current) {
      void onJoin();
    }
  }, [onJoin, status?.status, providers]);

  useEffect(() => {
    if (!counterDeploymentObservable) {
      return;
    }
    const subscription = counterDeploymentObservable.subscribe(
      setContractDeployment
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [counterDeploymentObservable]);

  useEffect(() => {
    if (!contractDeployment) {
      return;
    }

    if (
      contractDeployment.status === "in-progress" ||
      contractDeployment.status === "failed"
    ) {
      return;
    }
    setDeployedContractAPI(contractDeployment.api);
  }, [contractDeployment, setDeployedContractAPI]);

  useEffect(() => {
    if (deployedContractAPI) {
      const subscriptionDerivedState =
        deployedContractAPI.state$.subscribe(setDerivedState);
      return () => {
        subscriptionDerivedState.unsubscribe();
      };
    }
  }, [deployedContractAPI]);

  return {       
    deployedContractAPI,
    derivedState,
    onDeploy,
    providers
  };
};
