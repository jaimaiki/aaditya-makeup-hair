import requests
import sys
import json
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url="https://aadityatiwari.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )

    def test_contact_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+91 98765 43210",
            "service": "Bridal Makeup",
            "message": "This is a test message for portfolio contact form."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_get_contact_submissions(self):
        """Test retrieving contact submissions"""
        return self.run_test(
            "Get Contact Submissions",
            "GET",
            "api/contact",
            200
        )

    def test_portfolio_creation(self):
        """Test portfolio item creation"""
        portfolio_data = {
            "title": "Test Portfolio Item",
            "category": "bridal",
            "image_url": "https://example.com/test-image.jpg",
            "description": "Test portfolio item description"
        }
        
        success, response = self.run_test(
            "Create Portfolio Item",
            "POST",
            "api/portfolio",
            200,
            data=portfolio_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_get_portfolio_items(self):
        """Test retrieving all portfolio items"""
        return self.run_test(
            "Get All Portfolio Items",
            "GET",
            "api/portfolio",
            200
        )

    def test_get_portfolio_by_category(self):
        """Test retrieving portfolio items by category"""
        return self.run_test(
            "Get Portfolio Items by Category",
            "GET",
            "api/portfolio",
            200,
            params={"category": "bridal"}
        )

    def test_invalid_contact_submission(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "service": "Bridal Makeup",
            "message": "Test message"
        }
        
        return self.run_test(
            "Invalid Contact Submission",
            "POST",
            "api/contact",
            422,  # Validation error expected
            data=invalid_data
        )

def main():
    print("🚀 Starting Portfolio Website API Tests")
    print("=" * 50)
    
    # Setup
    tester = PortfolioAPITester()
    
    # Run tests
    print("\n📋 Testing API Endpoints...")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test contact form functionality
    contact_id = tester.test_contact_submission()
    tester.test_get_contact_submissions()
    
    # Test portfolio functionality
    portfolio_id = tester.test_portfolio_creation()
    tester.test_get_portfolio_items()
    tester.test_get_portfolio_by_category()
    
    # Test validation
    tester.test_invalid_contact_submission()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())