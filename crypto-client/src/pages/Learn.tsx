import LearnPageExplore from '../components/LearnPageExplore';
import LearnPageWallet from '../components/LearnPageWallet';
import LearnPageUSDC from '../components/LearnPageUSDC';
import LearnPageBanner from '../components/LearnPageBanner';

export default function Learn() {
  return (
    <>
      <LearnPageExplore />
      <LearnPageUSDC />
      <LearnPageWallet />
      <LearnPageBanner />
    </>
  )
}